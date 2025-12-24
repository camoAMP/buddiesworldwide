"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, ShoppingCart, Search, Filter, Leaf, Apple, Home, Cookie, ArrowLeft } from "lucide-react"
import { useCart } from "@/components/cart-provider"

const categoryData: Record<string, { name: string; icon: any; description: string; products: any[] }> = {
  "420": {
    name: "420 Shop",
    icon: Leaf,
    description: "Premium cannabis products from verified vendors",
    products: [
      {
        id: "420-1",
        name: "Organic CBD Oil 1000mg",
        price: 899,
        rating: 4.8,
        vendor: "Green Leaf Co",
        image: "/cbd-oil-bottle.jpg",
      },
      {
        id: "420-2",
        name: "Delta-8 Gummies 25mg",
        price: 629,
        rating: 4.7,
        vendor: "Chill Edibles",
        image: "/cannabis-gummies.png",
      },
      {
        id: "420-3",
        name: "Hemp Flower Oz",
        price: 1619,
        rating: 4.9,
        vendor: "Farm Direct Hemp",
        image: "/hemp-flower.jpg",
      },
      {
        id: "420-4",
        name: "CBD Topical Cream",
        price: 539,
        rating: 4.6,
        vendor: "Relief Labs",
        image: "/cbd-cream.jpg",
      },
      {
        id: "420-5",
        name: "Pre-Rolled Cones 6pk",
        price: 289,
        rating: 4.5,
        vendor: "Roll Masters",
        image: "/pre-rolled-cones.jpg",
      },
      {
        id: "420-6",
        name: "Glass Water Pipe",
        price: 1439,
        rating: 4.8,
        vendor: "Artisan Glass",
        image: "/glass-water-pipe.png",
      },
      {
        id: "420-7",
        name: "Herb Grinder Premium",
        price: 449,
        rating: 4.7,
        vendor: "Grind Co",
        image: "/herb-grinder.jpg",
      },
      {
        id: "420-8",
        name: "Vape Cartridge 1g",
        price: 809,
        rating: 4.6,
        vendor: "Vapor Tech",
        image: "/vape-cartridge.jpg",
      },
    ],
  },
  produce: {
    name: "Fruits & Vegetables",
    icon: Apple,
    description: "Fresh farm produce delivered to your door",
    products: [
      {
        id: "prod-1",
        name: "Organic Apples 2kg",
        price: 159,
        rating: 4.9,
        vendor: "Green Valley Farm",
        image: "/organic-red-apples.jpg",
      },
      {
        id: "prod-2",
        name: "Fresh Bananas Bunch",
        price: 49,
        rating: 4.8,
        vendor: "Tropical Imports",
        image: "/fresh-bananas.jpg",
      },
      {
        id: "prod-3",
        name: "Mixed Berries 1kg",
        price: 229,
        rating: 4.9,
        vendor: "Berry Best",
        image: "/mixed-berries.png",
      },
      {
        id: "prod-4",
        name: "Organic Spinach Bag",
        price: 89,
        rating: 4.7,
        vendor: "Leafy Greens Co",
        image: "/organic-spinach.png",
      },
      {
        id: "prod-5",
        name: "Avocados 6pk",
        price: 179,
        rating: 4.8,
        vendor: "Avo Express",
        image: "/ripe-avocados.png",
      },
      {
        id: "prod-6",
        name: "Roma Tomatoes 1kg",
        price: 109,
        rating: 4.6,
        vendor: "Sun Farms",
        image: "/roma-tomatoes.jpg",
      },
      {
        id: "prod-7",
        name: "Fresh Carrots 1.5kg",
        price: 69,
        rating: 4.7,
        vendor: "Root Harvest",
        image: "/fresh-carrots.png",
      },
      {
        id: "prod-8",
        name: "Citrus Mix Box",
        price: 339,
        rating: 4.9,
        vendor: "Citrus Grove",
        image: "/citrus-fruits-oranges-lemons.jpg",
      },
    ],
  },
  household: {
    name: "Household Essentials",
    icon: Home,
    description: "Everyday items for your home",
    products: [
      {
        id: "house-1",
        name: "Multi-Surface Cleaner",
        price: 125,
        rating: 4.7,
        vendor: "Clean Home",
        image: "/cleaning-spray.png",
      },
      {
        id: "house-2",
        name: "Laundry Detergent 2L",
        price: 269,
        rating: 4.8,
        vendor: "Fresh Wash",
        image: "/laundry-detergent.png",
      },
      {
        id: "house-3",
        name: "Paper Towels 12pk",
        price: 339,
        rating: 4.6,
        vendor: "Soft Touch",
        image: "/paper-towels.png",
      },
      {
        id: "house-4",
        name: "Dish Soap 3pk",
        price: 179,
        rating: 4.7,
        vendor: "Sparkle Clean",
        image: "/dish-soap-bottles.jpg",
      },
      {
        id: "house-5",
        name: "Toilet Paper 24pk",
        price: 409,
        rating: 4.9,
        vendor: "Comfort Roll",
        image: "/toilet-paper-package.jpg",
      },
      {
        id: "house-6",
        name: "Trash Bags 50ct",
        price: 229,
        rating: 4.5,
        vendor: "Tough Bags",
        image: "/trash-bags-box.jpg",
      },
      {
        id: "house-7",
        name: "Air Freshener 3pk",
        price: 159,
        rating: 4.6,
        vendor: "Fresh Air Co",
        image: "/air-freshener-spray.jpg",
      },
      {
        id: "house-8",
        name: "Sponges 6pk",
        price: 109,
        rating: 4.4,
        vendor: "Scrub Pro",
        image: "/kitchen-sponges.jpg",
      },
    ],
  },
  snacks: {
    name: "Snacks & Treats",
    icon: Cookie,
    description: "Delicious snacks for every craving",
    products: [
      {
        id: "snack-1",
        name: "Gourmet Trail Mix 500g",
        price: 229,
        rating: 4.8,
        vendor: "Nutty Delights",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: "snack-2",
        name: "Artisan Potato Chips",
        price: 89,
        rating: 4.7,
        vendor: "Crisp Co",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: "snack-3",
        name: "Dark Chocolate Bar",
        price: 125,
        rating: 4.9,
        vendor: "Cocoa Dreams",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: "snack-4",
        name: "Organic Granola Bars 8pk",
        price: 179,
        rating: 4.6,
        vendor: "Healthy Bites",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: "snack-5",
        name: "Popcorn Variety Pack",
        price: 269,
        rating: 4.7,
        vendor: "Pop Masters",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: "snack-6",
        name: "Dried Mango Slices",
        price: 139,
        rating: 4.8,
        vendor: "Tropical Snacks",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: "snack-7",
        name: "Cheese Crackers Box",
        price: 109,
        rating: 4.5,
        vendor: "Cracker Jack",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: "snack-8",
        name: "Mixed Nuts Tin",
        price: 299,
        rating: 4.9,
        vendor: "Nut House",
        image: "/placeholder.svg?height=300&width=300",
      },
    ],
  },
}

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("popular")
  const { addItem } = useCart()

  const category = categoryData[slug] || categoryData["420"]
  const CategoryIcon = category.icon

  const filteredProducts = category.products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price
    if (sortBy === "price-high") return b.price - a.price
    if (sortBy === "rating") return b.rating - a.rating
    return 0
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Category Hero */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center">
              <CategoryIcon className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{category.name}</h1>
              <p className="text-muted-foreground">{category.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <p className="text-muted-foreground mb-6">{sortedProducts.length} products found</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-all">
                <div className="aspect-square relative bg-muted">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground mb-1">{product.vendor}</p>
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="h-4 w-4 fill-secondary text-secondary" />
                    <span className="text-sm text-muted-foreground">{product.rating}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">R{product.price}</span>
                    <Button
                      size="sm"
                      onClick={() =>
                        addItem({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          vendorId: product.vendor,
                          vendorName: product.vendor,
                          category: category.name,
                        })
                      }
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
