import { type NextRequest, NextResponse } from "next/server"
import { getStripeClient } from "@/lib/stripe"

export async function GET(request: NextRequest) {
  try {
    const stripe = getStripeClient()
    if (!stripe) {
      return NextResponse.json({ error: "Stripe is not configured" }, { status: 500 })
    }

    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get("session_id")

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID required" }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["subscription", "customer"],
    })

    return NextResponse.json({
      session: {
        id: session.id,
        payment_status: session.payment_status,
        customer_email: session.customer_details?.email,
        subscription_id: session.subscription,
      },
    })
  } catch (error) {
    console.error("Error retrieving session:", error)
    return NextResponse.json({ error: "Error retrieving session" }, { status: 500 })
  }
}
