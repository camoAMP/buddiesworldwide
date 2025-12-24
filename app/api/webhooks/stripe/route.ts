import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature")!

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    switch (event.type) {
      case "customer.subscription.created":
        // Handle new subscription
        console.log("Subscription created:", event.data.object)
        break
      case "customer.subscription.updated":
        // Handle subscription updates
        console.log("Subscription updated:", event.data.object)
        break
      case "customer.subscription.deleted":
        // Handle subscription cancellation
        console.log("Subscription cancelled:", event.data.object)
        break
      case "invoice.payment_succeeded":
        // Handle successful payment
        console.log("Payment succeeded:", event.data.object)
        break
      case "invoice.payment_failed":
        // Handle failed payment
        console.log("Payment failed:", event.data.object)
        break
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 400 })
  }
}
