import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, LinkIcon, Sparkles, Zap, Crown } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "R0",
    period: "forever",
    description: "Perfect for getting started with bio-links",
    features: ["1 bio-link page", "5 links per page", "Basic analytics", "ConnectSync branding", "Community support"],
    limitations: ["Limited customization", "No AI summaries"],
    cta: "Get Started Free",
    popular: false,
    icon: LinkIcon,
  },
  {
    name: "Pro",
    price: "R169",
    period: "per month",
    description: "Everything you need to grow your audience",
    features: [
      "Unlimited bio-link pages",
      "Unlimited links",
      "Advanced analytics",
      "Custom branding",
      "10 AI summaries/month",
      "Priority support",
      "Custom themes",
      "Link scheduling",
    ],
    cta: "Start Pro Trial",
    popular: true,
    icon: Sparkles,
  },
  {
    name: "Business",
    price: "R529",
    period: "per month",
    description: "Advanced features for teams and businesses",
    features: [
      "Everything in Pro",
      "Unlimited AI summaries",
      "Team collaboration",
      "Advanced integrations",
      "White-label options",
      "Dedicated support",
      "Custom domains",
      "API access",
    ],
    cta: "Start Business Trial",
    popular: false,
    icon: Crown,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-end gap-4 mb-8">
          <Link href="/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/signup">
            <Button>Get Started</Button>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Choose the perfect plan for your <span className="text-primary">growth</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Start free and upgrade as you grow. All plans include our core bio-link features with AI-powered content
            summaries.
          </p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <Badge variant="secondary" className="px-3 py-1">
              <Zap className="h-3 w-3 mr-1" />
              14-day free trial
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              <CheckCircle className="h-3 w-3 mr-1" />
              No setup fees
            </Badge>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const IconComponent = plan.icon
            return (
              <Card key={plan.name} className={`relative ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-3 py-1">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  <CardDescription className="text-center">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                    {plan.limitations?.map((limitation) => (
                      <li key={limitation} className="flex items-center gap-3 opacity-60">
                        <div className="h-4 w-4 border border-muted-foreground/30 rounded-full flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.name === "Free" ? "/signup" : `/checkout?plan=${plan.name.toLowerCase()}`}>
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"} size="lg">
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Frequently Asked Questions</h2>
          <div className="grid gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">Can I change plans anytime?</h3>
                <p className="text-muted-foreground">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll
                  prorate any billing differences.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">What happens to my data if I cancel?</h3>
                <p className="text-muted-foreground">
                  Your bio-links remain active for 30 days after cancellation. You can export all your data anytime from
                  your dashboard.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">Do you offer refunds?</h3>
                <p className="text-muted-foreground">
                  We offer a 14-day money-back guarantee for all paid plans. No questions asked.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
