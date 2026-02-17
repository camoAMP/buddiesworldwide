import { type NextRequest, NextResponse } from "next/server"
import { getStripeClient } from "@/lib/stripe"

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripeClient()
    if (!stripe) {
      return NextResponse.json({ error: "Stripe is not configured" }, { status: 500 })
    }

    const { email, name } = await request.json()

    const customer = await stripe.customers.create({
      email,
      name,
    })

    return NextResponse.json({ customerId: customer.id })
  } catch (error) {
    console.error("Error creating customer:", error)
    return NextResponse.json({ error: "Error creating customer" }, { status: 500 })
  }
}
