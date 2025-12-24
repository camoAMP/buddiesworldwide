import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const now = new Date().toISOString()
    await prisma.$queryRaw`SELECT 1`

    return NextResponse.json({
      ok: true,
      now,
      env: Object.keys(process.env)
        .filter((k) => k.startsWith("NEXTAUTH") || k.startsWith("STRIPE") || k.startsWith("OPENAI"))
        .sort(),
    })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 })
  }
}
