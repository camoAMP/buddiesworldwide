import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)

  const category = searchParams.get("category")
  const vendor = searchParams.get("vendor")
  const search = searchParams.get("search")
  const featured = searchParams.get("featured")
  const sort = searchParams.get("sort") || "newest"
  const limit = Number.parseInt(searchParams.get("limit") || "20")
  const offset = Number.parseInt(searchParams.get("offset") || "0")

  let query = supabase
    .from("products")
    .select(`
      *,
      vendor:vendors(id, business_name, slug, logo_url, rating),
      category:categories(id, name, slug)
    `)
    .eq("status", "active")

  if (category) {
    const { data: cat } = await supabase.from("categories").select("id").eq("slug", category).single()
    if (cat) {
      query = query.eq("category_id", cat.id)
    }
  }

  if (vendor) {
    const { data: v } = await supabase.from("vendors").select("id").eq("slug", vendor).single()
    if (v) {
      query = query.eq("vendor_id", v.id)
    }
  }

  if (search) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
  }

  if (featured === "true") {
    query = query.eq("is_featured", true)
  }

  if (sort === "price-low") {
    query = query.order("price", { ascending: true })
  } else if (sort === "price-high") {
    query = query.order("price", { ascending: false })
  } else if (sort === "rating") {
    query = query.order("rating", { ascending: false })
  } else {
    query = query.order("created_at", { ascending: false })
  }

  query = query.range(offset, offset + limit - 1)

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

  // Check if user is a vendor
  const { data: vendor } = await supabase.from("vendors").select("id").eq("user_id", user.id).single()

  if (!vendor) {
    return NextResponse.json({ error: "Not a vendor" }, { status: 403 })
  }

  const body = await request.json()

  const { data: product, error } = await supabase
    .from("products")
    .insert({
      ...body,
      vendor_id: vendor.id,
      slug: body.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ product })
}
