import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// In a real implementation, this would connect to Stripe
// For now, we'll simulate the escrow payment process
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  
  // Verify user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { 
    amount, 
    currency = "ZAR", 
    orderId, 
    vendorId, 
    paymentMethodId,
    destination_currency = "ZAR"
  } = body;

  // Validate required fields
  if (!amount || !orderId || !vendorId || !paymentMethodId) {
    return NextResponse.json(
      { error: "Missing required fields: amount, orderId, vendorId, paymentMethodId" },
      { status: 400 }
    );
  }

  // Calculate fees (8% platform fee + R10 fixed)
  const platformFeePercent = 0.08; // 8%
  const fixedFee = 1000; // R10.00 in cents
  const platformFee = Math.round(amount * platformFeePercent);
  const totalAmount = amount + platformFee + fixedFee;

  // In a real implementation, this would create a payment intent via Stripe
  // For now, we'll return mock data
  const mockPaymentIntent = {
    id: `pi_${Math.random().toString(36).substr(2, 10)}`,
    amount: totalAmount,
    currency: currency.toLowerCase(),
    status: "requires_capture", // funds held in escrow
    created: new Date().toISOString(),
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
    fees: {
      platform_fee: platformFee,
      fixed_fee: fixedFee,
      total_fees: platformFee + fixedFee,
    },
    order_id: orderId,
    vendor_id: vendorId,
    customer_id: user.id,
    payment_method: paymentMethodId,
    metadata: {
      destination_currency,
    }
  };

  // In a real implementation, we would:
  // 1. Create a payment intent with Stripe
  // 2. Store the payment intent details in our DB
  // 3. Associate it with the order
  // 4. Hold funds in escrow until pickup is confirmed

  return NextResponse.json({ payment_intent: mockPaymentIntent });
}

export async function PUT(request: NextRequest) {
  // Handle releasing funds from escrow
  const supabase = await createClient();
  
  // Verify user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { paymentIntentId, action, orderId } = body;

  if (!paymentIntentId || !action || !["capture", "refund"].includes(action)) {
    return NextResponse.json(
      { error: "Missing required fields or invalid action (must be 'capture' or 'refund')" },
      { status: 400 }
    );
  }

  // In a real implementation, this would call Stripe to capture or refund
  // For now, we'll return mock data
  let responseStatus = "unknown";
  
  if (action === "capture") {
    // Release funds to vendor
    responseStatus = "captured";
  } else if (action === "refund") {
    // Return funds to buyer
    responseStatus = "refunded";
  }

  const result = {
    id: paymentIntentId,
    status: responseStatus,
    action: action,
    order_id: orderId,
    processed_by: user.id,
    processed_at: new Date().toISOString(),
  };

  // In a real implementation, we would:
  // 1. Call Stripe to capture or refund the payment
  // 2. Update our DB records accordingly
  // 3. Send notifications to involved parties

  return NextResponse.json({ result });
}

export async function GET(request: NextRequest) {
  // Retrieve payment details
  const supabase = await createClient();
  
  // Verify user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("order_id");

  if (!orderId) {
    return NextResponse.json(
      { error: "Missing required parameter: order_id" },
      { status: 400 }
    );
  }

  // In a real implementation, this would retrieve payment details from Stripe
  // For now, we'll return mock data
  const mockPaymentDetails = {
    id: `pi_mock_${orderId}`,
    amount: 15000, // R150.00 in cents
    currency: "zar",
    status: "requires_capture",
    created: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    fees: {
      platform_fee: 1200, // 8% of R150
      fixed_fee: 1000,    // R10
      total_fees: 2200,
    },
    order_id: orderId,
    customer_id: user.id,
    vendor_id: "vendor_mock_123",
    captured: false,
    refunded: false,
    captured_at: null,
    refunded_at: null,
  };

  return NextResponse.json({ payment: mockPaymentDetails });
}