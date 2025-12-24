import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const supabase = await createClient()

  const { searchParams } = new URL(request.url)
  const featured = searchParams.get("featured")
  const limit = Number.parseInt(searchParams.get("limit") || "20")

  let query = supabase
    .from("vendors")
    .select("*")
    .eq("is_active", true)
    .order("rating", { ascending: false })
    .limit(limit)

  if (featured === "true") {
    query = query.eq("is_verified", true)
  }

  const { data: vendors, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ vendors })
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

  const { data: vendor, error } = await supabase
    .from("vendors")
    .insert({
      ...body,
      user_id: user.id,
      slug: body.business_name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ vendor })
}
