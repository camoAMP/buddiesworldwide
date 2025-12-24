"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { CreditCard, Download, Calendar, AlertCircle, CheckCircle, Crown, Sparkles, ExternalLink } from "lucide-react"

interface Subscription {
  id: string
  status: string
  current_period_end: number
  cancel_at_period_end: boolean
  plan: string
  amount: number
}

export default function BillingPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)
  const [customerId] = useState("cus_example123") // This would come from user auth

  const [usage] = useState({
    bioLinks: { used: 3, limit: "unlimited" },
    aiSummaries: { used: 7, limit: 10 },
    customDomains: { used: 1, limit: 3 },
  })

  const [invoices] = useState([
    {
      id: "INV-001",
      date: "Feb 15, 2025",
      amount: "R169.00",
      status: "paid",
      downloadUrl: "#",
    },
    {
      id: "INV-002",
      date: "Jan 15, 2025",
      amount: "R169.00",
      status: "paid",
      downloadUrl: "#",
    },
    {
      id: "INV-003",
      date: "Dec 15, 2024",
      amount: "R169.00",
      status: "paid",
      downloadUrl: "#",
    },
  ])

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await fetch(`/api/get-subscription?customerId=${customerId}`)
        const data = await response.json()
        setSubscription(data.subscription)
      } catch (error) {
        console.error("Error fetching subscription:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSubscription()
  }, [customerId])

  const handleCancelSubscription = async () => {
    if (!subscription) return

    try {
      const response = await fetch("/api/cancel-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriptionId: subscription.id }),
      })

      if (response.ok) {
        // Refresh subscription data
        window.location.reload()
      }
    } catch (error) {
      console.error("Error cancelling subscription:", error)
    }
  }

  const handleManageBilling = async () => {
    try {
      const response = await fetch("/api/create-portal-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId }),
      })

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error("Error creating portal session:", error)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <CreditCard className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-semibold text-foreground">Billing & Subscription</h1>
          </div>
          <p className="text-muted-foreground">Manage your subscription, usage, and billing information.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Plan */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-secondary" />
                      {loading ? <Skeleton className="h-5 w-40" /> : <>Current Plan: {subscription?.plan || "Free"}</>}
                    </CardTitle>
                    <CardDescription>
                      {loading ? (
                        <Skeleton className="h-4 w-64" />
                      ) : subscription ? (
                        <>
                          R{(subscription.amount / 100).toFixed(2)}/month • Next billing:{" "}
                          {new Date(subscription.current_period_end * 1000).toLocaleDateString()}
                        </>
                      ) : (
                        "No active subscription"
                      )}
                    </CardDescription>
                  </div>
                  {loading ? (
                    <Skeleton className="h-6 w-16" />
                  ) : (
                    <Badge variant={subscription?.status === "active" ? "default" : "secondary"}>
                      {subscription?.status || "free"}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" onClick={handleManageBilling} disabled={loading}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Manage Billing
                  </Button>
                  {subscription && (
                    <Button
                      variant="outline"
                      className="text-destructive hover:text-destructive bg-transparent"
                      onClick={handleCancelSubscription}
                    >
                      {subscription.cancel_at_period_end ? "Reactivate" : "Cancel Subscription"}
                    </Button>
                  )}
                </div>

                {loading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-52" />
                    <Skeleton className="h-4 w-44" />
                  </div>
                ) : (
                  subscription && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-foreground">Plan Features</h4>
                      <ul className="space-y-1">
                        <li className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-3 w-3 text-secondary" />
                          Unlimited bio-link pages
                        </li>
                        <li className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-3 w-3 text-secondary" />
                          Advanced analytics
                        </li>
                        <li className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-3 w-3 text-secondary" />
                          {subscription.plan === "Business" ? "Unlimited" : "10"} AI summaries/month
                        </li>
                      </ul>
                    </div>
                  )
                )}
              </CardContent>
            </Card>

            {/* Usage */}
            <Card>
              <CardHeader>
                <CardTitle>Usage This Month</CardTitle>
                <CardDescription>Track your usage across different features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">Bio-Links Created</span>
                    <span className="text-muted-foreground">
                      {usage.bioLinks.used} / {usage.bioLinks.limit}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full">
                    <div className="h-2 bg-secondary rounded-full w-full" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">AI Summaries Generated</span>
                    <span className="text-muted-foreground">
                      {usage.aiSummaries.used} / {usage.aiSummaries.limit}
                    </span>
                  </div>
                  <Progress value={(usage.aiSummaries.used / usage.aiSummaries.limit) * 100} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">Custom Domains</span>
                    <span className="text-muted-foreground">
                      {usage.customDomains.used} / {usage.customDomains.limit}
                    </span>
                  </div>
                  <Progress value={(usage.customDomains.used / usage.customDomains.limit) * 100} className="h-2" />
                </div>

                {usage.aiSummaries.used >= usage.aiSummaries.limit * 0.8 && (
                  <div className="flex items-center gap-2 p-3 bg-accent/10 border border-accent/20 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-accent" />
                    <p className="text-sm text-foreground">
                      You're approaching your AI summary limit. Consider upgrading to Business for unlimited summaries.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Manage your payment information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-primary rounded flex items-center justify-center">
                      <span className="text-xs font-bold text-primary-foreground">VISA</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">•••• •••• •••• 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/27</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleManageBilling}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Update
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Billing History */}
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>Download invoices and view payment history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {invoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between p-3 border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">{invoice.id}</p>
                          <p className="text-sm text-muted-foreground">{invoice.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-foreground">{invoice.amount}</span>
                        <Badge variant={invoice.status === "paid" ? "default" : "secondary"}>{invoice.status}</Badge>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upgrade to Business</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <Crown className="h-5 w-5 text-accent" />
                  <span className="font-semibold text-foreground">R529/month</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-secondary" />
                    <span className="text-muted-foreground">Unlimited AI summaries</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-secondary" />
                    <span className="text-muted-foreground">Team collaboration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-secondary" />
                    <span className="text-muted-foreground">White-label options</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-secondary" />
                    <span className="text-muted-foreground">API access</span>
                  </li>
                </ul>
                <Button className="w-full">Upgrade Now</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Contact Support
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  View Documentation
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Billing FAQ
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
