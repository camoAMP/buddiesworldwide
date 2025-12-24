import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Get vendor
  const { data: vendor } = await supabase.from("vendors").select("id").eq("user_id", user.id).single()

  if (!vendor) {
    return NextResponse.json({ error: "Not a vendor" }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const lowStock = searchParams.get("low_stock") === "true"

  let query = supabase
    .from("products")
    .select("id, name, sku, stock_quantity, low_stock_threshold, status, images")
    .eq("vendor_id", vendor.id)
    .eq("track_inventory", true)
    .order("stock_quantity", { ascending: true })

  if (lowStock) {
    query = query.filter("stock_quantity", "lte", "low_stock_threshold")
  }

  const { data: products, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ products })
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { product_id, adjustment, movement_type, notes } = body

  // Get current product
  const { data: product, error: productError } = await supabase
    .from("products")
    .select("stock_quantity, vendor_id")
    .eq("id", product_id)
    .single()

  if (productError || !product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  const newQuantity = product.stock_quantity + adjustment

  // Update product stock
  const { error: updateError } = await supabase
    .from("products")
    .update({
      stock_quantity: newQuantity,
      updated_at: new Date().toISOString(),
    })
    .eq("id", product_id)

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  // Log inventory movement
  const { error: movementError } = await supabase.from("inventory_movements").insert({
    product_id,
    movement_type: movement_type || "adjustment",
    quantity: adjustment,
    previous_quantity: product.stock_quantity,
    new_quantity: newQuantity,
    notes,
    created_by: user.id,
  })

  if (movementError) {
    return NextResponse.json({ error: movementError.message }, { status: 500 })
  }

  return NextResponse.json({
    success: true,
    new_quantity: newQuantity,
  })
}
