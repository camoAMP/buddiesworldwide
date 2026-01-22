"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Bitcoin, Wallet, Lock, CheckCircle, ArrowLeft, Copy, Loader2, Banknote, Truck } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { toast } from "sonner"

const cryptoAddresses = {
  bitcoin: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  ethereum: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  litecoin: "ltc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  usdt: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cryptoCurrency, setCryptoCurrency] = useState("bitcoin")
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [shippingMethod, setShippingMethod] = useState("standard")

  const shippingCosts = {
    standard: 99,
    express: 249,
    overnight: 499,
    paxi: 59.95, // PAXI delivery option
  }

  const subtotal = total
  const shipping = shippingCosts[shippingMethod as keyof typeof shippingCosts]
  const tax = Math.round(subtotal * 0.15 * 100) / 100 // 15% VAT for South Africa
  const grandTotal = subtotal + shipping + tax

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Address copied to clipboard!")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setOrderPlaced(true)
    clearCart()
    toast.success("Order placed successfully!")
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center">
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Order Confirmed!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for your order. You will receive a confirmation email shortly.
            </p>
            <div className="space-y-3">
              <Link href="/delivery">
                <Button className="w-full">Track Your Order</Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full bg-transparent">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Add some items to your cart before checking out.</p>
            <Link href="/">
              <Button>Start Shopping</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between gap-2 mb-4">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Shopping
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" />
            <span>Secure Checkout</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Contact Information */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="+27 82 123 4567" required />
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" placeholder="123 Main Street" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                    <Input id="apartment" placeholder="Apt 4B" />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="Johannesburg" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="province">Province</Label>
                      <Input id="province" placeholder="Gauteng" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input id="postalCode" placeholder="2000" required />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Method */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Shipping Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-3">
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard" className="cursor-pointer">
                          <div className="font-medium">Standard Shipping</div>
                          <div className="text-sm text-muted-foreground">5-7 business days</div>
                        </Label>
                      </div>
                      <span className="font-semibold">R99</span>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express" className="cursor-pointer">
                          <div className="font-medium">Express Shipping</div>
                          <div className="text-sm text-muted-foreground">2-3 business days</div>
                        </Label>
                      </div>
                      <span className="font-semibold">R249</span>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="overnight" id="overnight" />
                        <Label htmlFor="overnight" className="cursor-pointer">
                          <div className="font-medium">Overnight Shipping</div>
                          <div className="text-sm text-muted-foreground">Next business day</div>
                        </Label>
                      </div>
                      <span className="font-semibold">R499</span>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="paxi" id="paxi" />
                        <Label htmlFor="paxi" className="cursor-pointer">
                          <div className="font-medium flex items-center gap-2">
                            <Truck className="h-4 w-4" />
                            PAXI Store Delivery
                          </div>
                          <div className="text-sm text-muted-foreground">Collect from nearest PAXI location</div>
                        </Label>
                      </div>
                      <span className="font-semibold">R59.95</span>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {shippingMethod === 'paxi' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Truck className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">PAXI Store Delivery</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        You will be able to select your nearest PAXI pickup point after placing your order.
                        You'll receive an SMS notification when your order arrives at the store.
                      </p>
                      <Link href="/paxi-delivery" className="text-sm text-blue-700 underline mt-2 inline-block">
                        Learn more about PAXI delivery
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                  <CardDescription>Choose your preferred payment method</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                    <TabsList className="grid grid-cols-4 w-full mb-6">
                      <TabsTrigger value="card" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        <span className="hidden sm:inline">Card</span>
                      </TabsTrigger>
                      <TabsTrigger value="crypto" className="flex items-center gap-2">
                        <Bitcoin className="h-4 w-4" />
                        <span className="hidden sm:inline">Crypto</span>
                      </TabsTrigger>
                      <TabsTrigger value="eft" className="flex items-center gap-2">
                        <Banknote className="h-4 w-4" />
                        <span className="hidden sm:inline">EFT</span>
                      </TabsTrigger>
                      <TabsTrigger value="paypal" className="flex items-center gap-2">
                        <Wallet className="h-4 w-4" />
                        <span className="hidden sm:inline">PayPal</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="card" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input id="cardName" placeholder="John Doe" />
                      </div>
                    </TabsContent>

                    <TabsContent value="crypto" className="space-y-4">
                      <div className="space-y-2">
                        <Label>Select Cryptocurrency</Label>
                        <RadioGroup
                          value={cryptoCurrency}
                          onValueChange={setCryptoCurrency}
                          className="grid grid-cols-2 gap-3"
                        >
                          <div className="flex items-center space-x-2 border border-border rounded-lg p-3">
                            <RadioGroupItem value="bitcoin" id="bitcoin" />
                            <Label htmlFor="bitcoin">Bitcoin (BTC)</Label>
                          </div>
                          <div className="flex items-center space-x-2 border border-border rounded-lg p-3">
                            <RadioGroupItem value="ethereum" id="ethereum" />
                            <Label htmlFor="ethereum">Ethereum (ETH)</Label>
                          </div>
                          <div className="flex items-center space-x-2 border border-border rounded-lg p-3">
                            <RadioGroupItem value="litecoin" id="litecoin" />
                            <Label htmlFor="litecoin">Litecoin (LTC)</Label>
                          </div>
                          <div className="flex items-center space-x-2 border border-border rounded-lg p-3">
                            <RadioGroupItem value="usdt" id="usdt" />
                            <Label htmlFor="usdt">USDT (TRC20)</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">
                          Send exactly R{grandTotal.toFixed(2)} worth of {cryptoCurrency.toUpperCase()} to:
                        </p>
                        <div className="flex items-center gap-2">
                          <code className="flex-1 bg-background p-2 rounded text-xs break-all">
                            {cryptoAddresses[cryptoCurrency as keyof typeof cryptoAddresses]}
                          </code>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="bg-transparent"
                            onClick={() =>
                              copyToClipboard(cryptoAddresses[cryptoCurrency as keyof typeof cryptoAddresses])
                            }
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="eft" className="space-y-4">
                      <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                        <h4 className="font-semibold">Bank Details</h4>
                        <div className="text-sm space-y-2">
                          <p>
                            <span className="text-muted-foreground">Bank:</span> First National Bank
                          </p>
                          <p>
                            <span className="text-muted-foreground">Account Name:</span> Buddies World Wide (Pty) Ltd
                          </p>
                          <p>
                            <span className="text-muted-foreground">Account Number:</span> 62845678901
                          </p>
                          <p>
                            <span className="text-muted-foreground">Branch Code:</span> 250655
                          </p>
                          <p>
                            <span className="text-muted-foreground">Reference:</span> Your email address
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Please use your email address as the payment reference. Orders will be processed once payment is
                        confirmed.
                      </p>
                    </TabsContent>

                    <TabsContent value="paypal" className="space-y-4">
                      <div className="text-center py-8">
                        <Wallet className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-4">
                          You will be redirected to PayPal to complete your payment.
                        </p>
                        <Button type="button" variant="outline" className="bg-transparent">
                          Continue with PayPal
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Button type="submit" size="lg" className="w-full mt-6" disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>Place Order - R{grandTotal.toFixed(2)}</>
                )}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground text-sm line-clamp-1">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        R{item.price} x {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-foreground">R{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">R{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">R{shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">VAT (15%)</span>
                    <span className="text-foreground">R{tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">R{grandTotal.toFixed(2)}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4">
                  <Lock className="h-4 w-4" />
                  <span>Your payment information is secure</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
