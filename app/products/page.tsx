"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Filter, Grid, List, ShoppingCart, Star, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/components/cart-provider"
import { toast } from "sonner"

interface Product {
  id: string
  name: string
  slug: string
  price: number
  compare_at_price: number | null
  images: string[]
  stock_quantity: number
  rating: number
  review_count: number
  vendor?: {
    business_name: string
    slug: string
  }
  category?: {
    name: string
    slug: string
  }
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const { addItem } = useCart()

  useEffect(() => {
    fetchProducts()
  }, [selectedCategory, sortBy])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      let url = `/api/products?sort=${encodeURIComponent(sortBy)}`
      if (selectedCategory !== "all") {
        url += `&category=${encodeURIComponent(selectedCategory)}`
      }
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error("Failed to load products")
      }
      const data = await res.json()
      setProducts(data.products || [])
    } catch {
      toast.error("Failed to load products")
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product: Product) => {
    if (product.stock_quantity <= 0) {
      toast.error("Product is out of stock")
      return
    }
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || "/placeholder.svg",
      quantity: 1,
    })
    toast.success(`${product.name} added to cart`)
  }

  const normalizedQuery = searchQuery.trim().toLowerCase()
  const filteredProducts = products.filter((product) =>
    (product.name || "").toLowerCase().includes(normalizedQuery),
  )

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "420", label: "420 Zone" },
    { value: "fruits-vegetables", label: "Fruits & Vegetables" },
    { value: "household", label: "Household Essentials" },
    { value: "snacks", label: "Snacks & Beverages" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">All Products</h1>
              <p className="text-muted-foreground">Browse the latest items from our verified vendors</p>
            </div>
            <Link href="/checkout">
              <Button variant="outline" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
          </div>
          <div className="relative w-full md:max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Sort
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortBy("newest")}>Newest</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("price-low")}>Price: Low to High</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("price-high")}>Price: High to Low</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("rating")}>Top Rated</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{filteredProducts.length} products</span>
            <Button variant={viewMode === "grid" ? "default" : "ghost"} size="icon" onClick={() => setViewMode("grid")}>
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "ghost"} size="icon" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-square bg-muted" />
                <CardContent className="p-4">
                  <div className="h-4 bg-muted rounded mb-2" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No products found</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" : "flex flex-col gap-4"
            }
          >
            {filteredProducts.map((product) => {
              const stockQty = Number(product.stock_quantity ?? 0)
              const rating = Number(product.rating ?? 0)
              const reviewCount = Number(product.review_count ?? 0)
              const price = Number(product.price ?? 0)
              const compareAtPrice = product.compare_at_price ?? null

              return (
                <Card key={product.id} className={viewMode === "list" ? "flex flex-row" : ""}>
                  <Link href={`/products/${product.id}`} className={viewMode === "list" ? "w-48" : ""}>
                    <div
                      className={`relative ${viewMode === "list" ? "h-full" : "aspect-square"} overflow-hidden rounded-t-lg`}
                    >
                      <Image
                        src={product.images?.[0] || "/placeholder.svg?height=300&width=300&query=product"}
                        alt={product.name}
                        fill
                        className="object-cover hover:scale-105 transition-transform"
                      />
                      {compareAtPrice && compareAtPrice > price && (
                        <Badge className="absolute top-2 left-2 bg-destructive">Sale</Badge>
                      )}
                      {stockQty <= 0 && (
                        <Badge variant="secondary" className="absolute top-2 right-2">
                          Out of Stock
                        </Badge>
                      )}
                      {stockQty > 0 && stockQty <= 5 && (
                        <Badge variant="outline" className="absolute top-2 right-2 bg-background">
                          Low Stock
                        </Badge>
                      )}
                    </div>
                  </Link>
                  <CardContent className={`p-4 ${viewMode === "list" ? "flex-1 flex flex-col justify-between" : ""}`}>
                    <div>
                      {product.vendor && (
                        <Link
                          href={`/vendors/${product.vendor.slug}`}
                          className="text-xs text-muted-foreground hover:text-primary"
                        >
                          {product.vendor.business_name}
                        </Link>
                      )}
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-semibold hover:text-primary line-clamp-2">{product.name}</h3>
                      </Link>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-muted-foreground">
                          {rating.toFixed(1)} ({reviewCount})
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <span className="font-bold text-lg">R{price.toFixed(2)}</span>
                        {compareAtPrice && compareAtPrice > price && (
                          <span className="text-sm text-muted-foreground line-through ml-2">
                            R{compareAtPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <Button size="sm" onClick={() => handleAddToCart(product)} disabled={stockQty <= 0}>
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
