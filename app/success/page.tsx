"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [sessionData, setSessionData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSession = async () => {
      if (!sessionId) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/checkout-session?session_id=${sessionId}`)
        const data = await response.json()
        setSessionData(data)
      } catch (error) {
        console.error("Error fetching session:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSession()
  }, [sessionId])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Processing your subscription...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="pb-4">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
            <CheckCircle className="h-8 w-8 text-secondary" />
          </div>
          <CardTitle className="text-2xl">Welcome to ConnectSync!</CardTitle>
          <CardDescription>Your subscription has been activated successfully</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="h-4 w-4 text-secondary" />
              <span className="text-muted-foreground">14-day free trial started</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-secondary" />
              <span className="text-muted-foreground">Full access to all features</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-secondary" />
              <span className="text-muted-foreground">Cancel anytime during trial</span>
            </div>
          </div>

          <div className="space-y-3">
            <Link href="/dashboard">
              <Button className="w-full" size="lg">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard/builder">
              <Button variant="outline" className="w-full bg-transparent">
                Create Your First Bio-Link
              </Button>
            </Link>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>
              Need help getting started?{" "}
              <Link href="/help" className="text-primary hover:underline">
                View our guide
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
