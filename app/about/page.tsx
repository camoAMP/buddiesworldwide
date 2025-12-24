import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, Users, Shield, Zap } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold">About Buddies World Wide</h1>
          <p className="text-xl text-muted-foreground">
            Connecting vendors and customers worldwide through a trusted multi-vendor marketplace
          </p>
        </div>

        {/* Mission Section */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              At Buddies World Wide, we're building more than just a marketplace. We're creating a global community
              where vendors can showcase their products and customers can discover unique items from around the world.
            </p>
            <p className="text-lg text-muted-foreground">
              From specialty 420 products to everyday household essentials, fresh produce to gourmet snacks, we bring
              together diverse vendors offering quality products at competitive prices.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Our Vision</h2>
            <p className="text-lg text-muted-foreground">
              We envision a world where geographical boundaries don't limit commerce. Our platform empowers small and
              medium-sized businesses to reach customers globally while providing shoppers with access to products they
              might never have discovered otherwise.
            </p>
            <p className="text-lg text-muted-foreground">
              With secure payments, reliable delivery, and exceptional customer service, we're making international
              commerce accessible to everyone.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card>
            <CardContent className="p-6 text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Global Reach</h3>
              <p className="text-sm text-muted-foreground">Connect with vendors and customers from around the world</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Community Driven</h3>
              <p className="text-sm text-muted-foreground">Built by and for a community of passionate entrepreneurs</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Secure & Safe</h3>
              <p className="text-sm text-muted-foreground">
                Your data and transactions are protected with industry-leading security
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Quick and reliable shipping to get your products when you need them
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="max-w-4xl mx-auto bg-primary text-primary-foreground rounded-2xl p-12 mb-16">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-lg opacity-90">Active Vendors</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500,000+</div>
              <div className="text-lg opacity-90">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2M+</div>
              <div className="text-lg opacity-90">Products Listed</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">Join Our Community</h2>
          <p className="text-lg text-muted-foreground">
            Whether you're a vendor looking to expand your reach or a customer seeking unique products, Buddies World
            Wide is your destination.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/vendor/register">Become a Vendor</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/register">Shop Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
