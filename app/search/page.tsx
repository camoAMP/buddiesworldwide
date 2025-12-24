"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, SlidersHorizontal, Star } from "lucide-react"
import { CartButton } from "@/components/cart-button"
import { WishlistButton } from "@/components/wishlist-button"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)

  const products = [
    {
      id: 1,
      name: "CBD Oil 1000mg",
      price: 899,
      image: "/cbd-oil-bottle.jpg",
      rating: 4.8,
      reviews: 124,
      category: "420 Products",
      inStock: true,
    },
    {
      id: 2,
      name: "Organic Red Apples",
      price: 45,
      image: "/fresh-red-apples.png",
      rating: 4.6,
      reviews: 89,
      category: "Produce",
      inStock: true,
    },
    // Add more products...
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
          <div className="w-full md:max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <WishlistButton />
            <CartButton />
          </div>
        </div>

        <div className="grid lg:grid-cols-[250px_1fr] gap-8">
          {/* Filters Sidebar */}
          <aside className="space-y-6">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Filters</h3>
                  <Button variant="ghost" size="sm">
                    Clear All
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Category</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">420 Products</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Household</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Produce</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Snacks</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Price Range</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="radio" name="price" className="rounded-full" />
                        <span className="text-sm">Under R50</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="price" className="rounded-full" />
                        <span className="text-sm">R50 - R200</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="price" className="rounded-full" />
                        <span className="text-sm">R200 - R500</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="price" className="rounded-full" />
                        <span className="text-sm">Over R500</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Rating</h4>
                    <div className="space-y-2">
                      {[4, 3, 2, 1].map((rating) => (
                        <label key={rating} className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" />
                          <div className="flex items-center gap-1">
                            {Array.from({ length: rating }).map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            ))}
                            <span className="text-sm ml-1">& up</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Results */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Search Results</h1>
                <p className="text-muted-foreground">{query ? `Showing results for "${query}"` : "All products"}</p>
              </div>
              <Button variant="outline">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Sort By
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                  <Link href={`/product/${product.id}`}>
                    <CardContent className="p-4 space-y-3">
                      <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="space-y-2">
                        <Badge variant="secondary" className="text-xs">
                          {product.category}
                        </Badge>
                        <h3 className="font-semibold line-clamp-2">{product.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{product.rating}</span>
                          <span className="text-xs text-muted-foreground">({product.reviews})</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-primary">R{product.price}</span>
                          {product.inStock ? (
                            <Badge variant="outline" className="text-green-600">
                              In Stock
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-red-600">
                              Out of Stock
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
