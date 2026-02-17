import { type NextRequest, NextResponse } from "next/server"
import { getStripeClient } from "@/lib/stripe"

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripeClient()
    if (!stripe) {
      return NextResponse.json({ error: "Stripe is not configured" }, { status: 500 })
    }

    const { subscriptionId } = await request.json()

    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    })

    return NextResponse.json({
      success: true,
      subscription: {
        id: subscription.id,
        cancel_at_period_end: subscription.cancel_at_period_end,
      },
    })
  } catch (error) {
    console.error("Error cancelling subscription:", error)
    return NextResponse.json({ error: "Error cancelling subscription" }, { status: 500 })
  }
}
