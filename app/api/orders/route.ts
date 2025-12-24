import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

function generateOrderNumber(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "")
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `BWW-${date}-${random}`
}

export async function GET(request: NextRequest) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const role = searchParams.get("role") || "customer"
  const status = searchParams.get("status")
  const limit = Number.parseInt(searchParams.get("limit") || "20")

  if (role === "vendor") {
    // Get vendor orders
    const { data: vendor } = await supabase.from("vendors").select("id").eq("user_id", user.id).single()

    if (!vendor) {
      return NextResponse.json({ error: "Not a vendor" }, { status: 403 })
    }

    let query = supabase
      .from("orders")
      .select(`
        *,
        items:order_items(*)
      `)
      .eq("vendor_id", vendor.id)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (status) {
      query = query.eq("status", status)
    }

    const { data: orders, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ orders })
  } else {
    // Get customer orders
    const { data: customer } = await supabase.from("customers").select("id").eq("user_id", user.id).single()

    if (!customer) {
      return NextResponse.json({ orders: [] })
    }

    let query = supabase
      .from("orders")
      .select(`
        *,
        items:order_items(*)
      `)
      .eq("customer_id", customer.id)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (status) {
      query = query.eq("status", status)
    }

    const { data: orders, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ orders })
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()

  const body = await request.json()
  const { items, shipping_address, billing_address, payment_method, shipping_method, customer_notes, discount_code } =
    body

  // Calculate totals
  let subtotal = 0
  let discount_amount = 0
  const orderItems: Array<{
    product_id: string
    vendor_id: string
    product_name: string
    product_sku: string | null
    product_image: string | null
    unit_price: number
    quantity: number
    total_amount: number
  }> = []

  for (const item of items) {
    const { data: product } = await supabase
      .from("products")
      .select("id, vendor_id, name, sku, price, images, stock_quantity, track_inventory")
      .eq("id", item.product_id)
      .single()

    if (!product) continue

    // Check stock
    if (product.track_inventory && product.stock_quantity < item.quantity) {
      return NextResponse.json(
        {
          error: `Insufficient stock for ${product.name}`,
        },
        { status: 400 },
      )
    }

    const itemTotal = product.price * item.quantity
    subtotal += itemTotal

    orderItems.push({
      product_id: product.id,
      vendor_id: product.vendor_id,
      product_name: product.name,
      product_sku: product.sku,
      product_image: product.images?.[0] || null,
      unit_price: product.price,
      quantity: item.quantity,
      total_amount: itemTotal,
    })
  }

  // Apply discount code
  if (discount_code) {
    const { data: discount } = await supabase
      .from("discount_codes")
      .select("*")
      .eq("code", discount_code.toUpperCase())
      .eq("is_active", true)
      .single()

    if (discount) {
      if (discount.discount_type === "percentage") {
        discount_amount = subtotal * (discount.discount_value / 100)
        if (discount.maximum_discount_amount) {
          discount_amount = Math.min(discount_amount, discount.maximum_discount_amount)
        }
      } else if (discount.discount_type === "fixed_amount") {
        discount_amount = discount.discount_value
      }

      // Update usage count
      await supabase
        .from("discount_codes")
        .update({ usage_count: discount.usage_count + 1 })
        .eq("id", discount.id)
    }
  }

  // Calculate shipping
  const shipping_amount = shipping_method === "express" ? 249 : 99

  // Calculate tax (15% VAT)
  const taxable_amount = subtotal - discount_amount
  const tax_amount = taxable_amount * 0.15

  // Total
  const total_amount = subtotal - discount_amount + shipping_amount + tax_amount

  // Get or create customer
  let customer_id = null
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    const { data: customer } = await supabase.from("customers").select("id").eq("user_id", user.id).single()

    if (customer) {
      customer_id = customer.id
    }
  }

  // Create order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      order_number: generateOrderNumber(),
      customer_id,
      subtotal,
      discount_amount,
      shipping_amount,
      tax_amount,
      total_amount,
      currency: "ZAR",
      status: "pending",
      payment_status: "pending",
      payment_method,
      shipping_address,
      billing_address,
      shipping_method,
      customer_notes,
    })
    .select()
    .single()

  if (orderError) {
    return NextResponse.json({ error: orderError.message }, { status: 500 })
  }

  // Create order items
  const orderItemsWithOrderId = orderItems.map((item) => ({
    ...item,
    order_id: order.id,
  }))

  const { error: itemsError } = await supabase.from("order_items").insert(orderItemsWithOrderId)

  if (itemsError) {
    return NextResponse.json({ error: itemsError.message }, { status: 500 })
  }

  return NextResponse.json({ order })
}
