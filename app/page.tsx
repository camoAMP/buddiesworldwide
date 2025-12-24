import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Globe,
  Truck,
  ShieldCheck,
  Leaf,
  Apple,
  HomeIcon,
  Cookie,
  Bitcoin,
  CreditCard,
  Store,
  ArrowRight,
  Star,
  Clock,
  Pill,
  Baby,
  Dog,
  Sparkles,
} from "lucide-react"

const categories = [
  {
    name: "420 Shop",
    icon: Leaf,
    href: "/category/420",
    color: "bg-primary",
    description: "Premium cannabis products",
    count: "500+ products",
  },
  {
    name: "Fruits & Vegetables",
    icon: Apple,
    href: "/category/produce",
    color: "bg-chart-1",
    description: "Fresh farm produce",
    count: "300+ products",
  },
  {
    name: "Household Essentials",
    icon: HomeIcon,
    href: "/category/household",
    color: "bg-secondary",
    description: "Everyday home items",
    count: "800+ products",
  },
  {
    name: "Snacks & Treats",
    icon: Cookie,
    href: "/category/snacks",
    color: "bg-accent",
    description: "Delicious snacks",
    count: "450+ products",
  },
  {
    name: "Health & Wellness",
    icon: Pill,
    href: "/category/health",
    color: "bg-chart-2",
    description: "Vitamins & supplements",
    count: "350+ products",
  },
  {
    name: "Baby & Kids",
    icon: Baby,
    href: "/category/baby",
    color: "bg-pink-500",
    description: "Baby essentials & toys",
    count: "420+ products",
  },
  {
    name: "Pet Supplies",
    icon: Dog,
    href: "/category/pets",
    color: "bg-orange-500",
    description: "Food & accessories",
    count: "280+ products",
  },
  {
    name: "Beauty & Personal",
    icon: Sparkles,
    href: "/category/beauty",
    color: "bg-purple-500",
    description: "Skincare & cosmetics",
    count: "600+ products",
  },
]

const featuredProducts = [
  { id: "1", name: "Organic CBD Oil", price: 899, rating: 4.8, image: "/cbd-oil-bottle.jpg", category: "420" },
  {
    id: "2",
    name: "Fresh Organic Apples",
    price: 109,
    rating: 4.9,
    image: "/fresh-red-apples.png",
    category: "Produce",
  },
  {
    id: "3",
    name: "Multi-Surface Cleaner",
    price: 159,
    rating: 4.7,
    image: "/cleaning-spray-bottle.png",
    category: "Household",
  },
  {
    id: "4",
    name: "Gourmet Trail Mix",
    price: 229,
    rating: 4.6,
    image: "/trail-mix-nuts-snacks.jpg",
    category: "Snacks",
  },
]

const paymentMethods = [
  { name: "Visa/Mastercard", icon: CreditCard },
  { name: "Bitcoin", icon: Bitcoin },
  { name: "PayPal", icon: CreditCard },
  { name: "Ethereum", icon: Bitcoin },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Global Marketplace</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              <span className="text-foreground">Buddies</span>{" "}
              <span className="text-primary">World</span>{" "}
              <span className="text-secondary">Wide</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty max-w-2xl">
              Connect with trusted vendors from around the globe. From fresh produce to household essentials, 420
              products to gourmet snacks - find everything you need, delivered to your door.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Shopping Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/vendor/register">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  <Store className="mr-2 h-4 w-4" />
                  Sell on Buddies
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 right-10 hidden lg:block opacity-20">
          <Globe className="h-64 w-64 text-primary" />
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-y border-border bg-card py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Truck className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Worldwide Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Secure Payments</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Bitcoin className="h-5 w-5 text-secondary" />
              <span className="text-sm font-medium">Crypto Accepted</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories - Updated grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Shop by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our curated categories featuring products from verified vendors worldwide
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link key={category.name} href={category.href}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                  <CardContent className="p-4 md:p-6 flex flex-col items-center text-center">
                    <div
                      className={`h-12 w-12 md:h-16 md:w-16 rounded-2xl ${category.color} flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <category.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    </div>
                    <h3 className="text-sm md:text-lg font-semibold text-foreground mb-1 md:mb-2">{category.name}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground mb-2 hidden sm:block">
                      {category.description}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Top picks from our trusted vendors</p>
            </div>
            <Link href="/products">
              <Button variant="outline" className="hidden sm:flex bg-transparent">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="aspect-square relative bg-muted">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-card/90 text-foreground">{product.category}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-1">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">R{product.price}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-secondary text-secondary" />
                        <span className="text-sm text-muted-foreground">{product.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/products">
              <Button variant="outline" className="bg-transparent">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Vendor CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <Badge className="w-fit mb-4 bg-secondary/20 text-secondary border-secondary/30">For Vendors</Badge>
                <h2 className="text-3xl font-bold text-foreground mb-4">Start Selling Worldwide Today</h2>
                <p className="text-muted-foreground mb-6">
                  Join thousands of vendors reaching customers globally. Low fees, powerful tools, and access to
                  millions of potential buyers. Set up your store in minutes.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <span>Secure payment processing</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <Truck className="h-5 w-5 text-primary" />
                    <span>Integrated shipping solutions</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <Globe className="h-5 w-5 text-primary" />
                    <span>Reach customers worldwide</span>
                  </li>
                </ul>
                <Link href="/vendor/register">
                  <Button size="lg" className="w-fit bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    Register as Vendor - R549/month
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-8 flex items-center justify-center">
                <div className="text-center">
                  <Store className="h-32 w-32 text-primary mx-auto mb-4 opacity-80" />
                  <p className="text-2xl font-bold text-foreground">5,000+ Vendors</p>
                  <p className="text-muted-foreground">Already selling on Buddies</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Web3 Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Web3 Integration</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our Web3 starter kit with blockchain integration, smart accounts, and more
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <Badge className="w-fit mb-4 bg-purple-500/20 text-purple-600 border-purple-500/30">New</Badge>
                <h2 className="text-3xl font-bold text-foreground mb-4">Web3 Application Starter Kit</h2>
                <p className="text-muted-foreground mb-6">
                  Everything you need to start building decentralized applications. Includes Ethereum and BSC integration,
                  MetaMask Smart Accounts, and secure API infrastructure.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    <span>Ethereum and BSC integration</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    <span>MetaMask Smart Accounts Kit</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    <span>Secure server-side API routes</span>
                  </li>
                </ul>
                <Link href="/web3-starter">
                  <Button size="lg" className="w-fit bg-purple-600 text-white hover:bg-purple-700">
                    Explore Web3 Kit
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 p-8 flex items-center justify-center">
                <div className="text-center">
                  <Bitcoin className="h-32 w-32 text-purple-500 mx-auto mb-4 opacity-80" />
                  <p className="text-2xl font-bold text-foreground">Web3 Ready</p>
                  <p className="text-muted-foreground">Start building dApps today</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Pay Your Way</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We accept a wide variety of payment methods including cryptocurrency
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {paymentMethods.map((method) => {
              const IconComponent = method.icon
              return (
                <div
                  key={method.name}
                  className="bg-card border border-border rounded-lg px-6 py-3 text-sm font-medium text-muted-foreground flex items-center"
                >
                  <IconComponent className="h-5 w-5 mr-2" />
                  {method.name}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <Globe className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-foreground">Buddies World Wide</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your global marketplace for everyday essentials and specialty products.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/category/420" className="hover:text-primary transition-colors">
                    420 Shop
                  </Link>
                </li>
                <li>
                  <Link href="/category/produce" className="hover:text-primary transition-colors">
                    Fresh Produce
                  </Link>
                </li>
                <li>
                  <Link href="/category/household" className="hover:text-primary transition-colors">
                    Household
                  </Link>
                </li>
                <li>
                  <Link href="/category/snacks" className="hover:text-primary transition-colors">
                    Snacks
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Account</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/login" className="hover:text-primary transition-colors">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-primary transition-colors">
                    Register Free
                  </Link>
                </li>
                <li>
                  <Link href="/orders" className="hover:text-primary transition-colors">
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link href="/wishlist" className="hover:text-primary transition-colors">
                    Wishlist
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/delivery" className="hover:text-primary transition-colors">
                    Track Delivery
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-primary transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/vendor/register" className="hover:text-primary transition-colors">
                    Become a Vendor
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Buddies World Wide. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
