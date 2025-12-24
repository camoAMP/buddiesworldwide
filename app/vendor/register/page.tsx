"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Store,
  Mail,
  Lock,
  User,
  ArrowRight,
  CheckCircle,
  Truck,
  BarChart3,
  CreditCard,
  Headphones,
  Building,
  Phone,
} from "lucide-react"
import { toast } from "sonner"

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 549,
    period: "month",
    description: "Perfect for new vendors",
    features: ["Up to 50 products", "Basic analytics", "Standard support", "2.9% transaction fee", "Weekly payouts"],
  },
  {
    id: "professional",
    name: "Professional",
    price: 1449,
    period: "month",
    description: "For growing businesses",
    features: [
      "Up to 500 products",
      "Advanced analytics",
      "Priority support",
      "2.5% transaction fee",
      "Daily payouts",
      "Featured listings",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 3599,
    period: "month",
    description: "For large operations",
    features: [
      "Unlimited products",
      "Custom analytics",
      "Dedicated support",
      "2% transaction fee",
      "Instant payouts",
      "Premium placement",
      "API access",
    ],
  },
]

export default function VendorRegisterPage() {
  const [step, setStep] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState("professional")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    toast.success("Vendor application submitted! We'll review it within 24-48 hours.")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-6">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">Already a vendor?</span>
            <Link href="/vendor/login">
              <Button variant="outline" size="sm" className="bg-transparent">
                Vendor Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Store className="h-4 w-4" />
            Become a Vendor
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Start Selling to Customers Worldwide</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of successful vendors on Buddies World Wide. Reach millions of customers, manage your
            inventory easily, and grow your business globally.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6 text-center">
              <Truck className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Global Reach</h3>
              <p className="text-sm text-muted-foreground">Ship to customers in 100+ countries worldwide</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <BarChart3 className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Analytics</h3>
              <p className="text-sm text-muted-foreground">Track sales, views, and customer insights</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <CreditCard className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Easy Payments</h3>
              <p className="text-sm text-muted-foreground">Get paid quickly with multiple payout options</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Headphones className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">Dedicated vendor support team ready to help</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {step > s ? <CheckCircle className="h-5 w-5" /> : s}
              </div>
              {s < 3 && <div className={`w-16 h-1 mx-2 ${step > s ? "bg-primary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-8 mb-8 text-sm">
          <span className={step >= 1 ? "text-primary font-medium" : "text-muted-foreground"}>Choose Plan</span>
          <span className={step >= 2 ? "text-primary font-medium" : "text-muted-foreground"}>Business Info</span>
          <span className={step >= 3 ? "text-primary font-medium" : "text-muted-foreground"}>Account Setup</span>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Choose Plan */}
          {step === 1 && (
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground text-center mb-8">Choose Your Vendor Plan</h2>
              <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="grid md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <div key={plan.id} className="relative">
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-medium z-10">
                        Most Popular
                      </div>
                    )}
                    <Card
                      className={`cursor-pointer transition-all h-full ${selectedPlan === plan.id ? "ring-2 ring-primary" : "hover:shadow-lg"}`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      <CardHeader className="text-center pb-2">
                        <div className="flex items-center justify-center gap-2">
                          <RadioGroupItem value={plan.id} id={plan.id} />
                          <CardTitle>{plan.name}</CardTitle>
                        </div>
                        <CardDescription>{plan.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className="mb-6">
                          <span className="text-4xl font-bold text-foreground">R{plan.price}</span>
                          <span className="text-muted-foreground">/{plan.period}</span>
                        </div>
                        <ul className="space-y-3 text-left">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </RadioGroup>
              <div className="mt-8 text-center">
                <Button type="submit" size="lg">
                  Continue with {plans.find((p) => p.id === selectedPlan)?.name}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Business Info */}
          {step === 2 && (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Business Information
                </CardTitle>
                <CardDescription>Tell us about your business</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input id="businessName" placeholder="Your Store Name" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select defaultValue="individual">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual / Sole Proprietor</SelectItem>
                      <SelectItem value="llc">LLC</SelectItem>
                      <SelectItem value="corporation">Corporation</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Primary Product Category</Label>
                  <Select defaultValue="420">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="420">420 / Cannabis Products</SelectItem>
                      <SelectItem value="produce">Fruits & Vegetables</SelectItem>
                      <SelectItem value="household">Household Essentials</SelectItem>
                      <SelectItem value="snacks">Snacks & Treats</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select defaultValue="us">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="pl-10" required />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Business Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell customers about your business and what you sell..."
                    rows={4}
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" className="bg-transparent" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button type="submit" className="flex-1">
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Account Setup */}
          {step === 3 && (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Create Your Account
                </CardTitle>
                <CardDescription>Set up your vendor login credentials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
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
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="you@business.com" className="pl-10" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a strong password"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Separator />

                {/* Payment Summary */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {plans.find((p) => p.id === selectedPlan)?.name} Plan
                      </span>
                      <span className="text-foreground">R{plans.find((p) => p.id === selectedPlan)?.price}/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">First month</span>
                      <span className="text-primary font-medium">FREE</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-semibold">
                      <span>Due today</span>
                      <span className="text-primary">R0.00</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    Your first month is free. You{"'"}ll be charged R{plans.find((p) => p.id === selectedPlan)?.price}{" "}
                    after your trial ends. Cancel anytime.
                  </p>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" required />
                  <label htmlFor="terms" className="text-sm text-muted-foreground leading-tight">
                    I agree to the{" "}
                    <Link href="/vendor/terms" className="text-primary hover:underline">
                      Vendor Terms of Service
                    </Link>
                    ,{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                    , and{" "}
                    <Link href="/vendor/guidelines" className="text-primary hover:underline">
                      Seller Guidelines
                    </Link>
                  </label>
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" className="bg-transparent" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isLoading}>
                    {isLoading ? (
                      "Creating Account..."
                    ) : (
                      <>
                        <Store className="mr-2 h-4 w-4" />
                        Start Selling - Free Trial
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </div>
    </div>
  )
}
