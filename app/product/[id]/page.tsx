"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  ShieldCheck,
  Minus,
  Plus,
  ArrowLeft,
  Store,
  MessageSquare,
  ThumbsUp,
} from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { useWishlist } from "@/components/wishlist-provider"
import { toast } from "sonner"

// Mock product data
const products: Record<string, any> = {
  "1": {
    id: "1",
    name: "Organic CBD Oil 500mg",
    price: 899,
    originalPrice: 1099,
    description:
      "Premium full-spectrum CBD oil extracted from organically grown hemp. Perfect for daily wellness and relaxation. Third-party lab tested for purity and potency.",
    category: "420",
    vendor: "Green Wellness SA",
    vendorRating: 4.9,
    rating: 4.8,
    reviewCount: 234,
    stock: 45,
    images: ["/cbd-oil-bottle.jpg"],
    features: ["500mg Full Spectrum CBD", "Organic Hemp Extract", "Third-Party Lab Tested", "No THC", "Natural Flavor"],
  },
  "2": {
    id: "2",
    name: "Fresh Organic Apples (1kg)",
    price: 109,
    originalPrice: null,
    description:
      "Crisp, juicy organic apples sourced directly from local farms. Perfect for snacking, baking, or making fresh juice. Pesticide-free and naturally grown.",
    category: "Produce",
    vendor: "Farm Fresh SA",
    vendorRating: 4.8,
    rating: 4.9,
    reviewCount: 567,
    stock: 150,
    images: ["/fresh-red-apples.png"],
    features: ["100% Organic", "Locally Sourced", "Pesticide Free", "Fresh Daily", "1kg Pack"],
  },
}

const reviews = [
  {
    id: "1",
    user: "Sarah M.",
    rating: 5,
    date: "2024-01-10",
    comment: "Excellent quality! Really helped with my anxiety and sleep issues. Will definitely buy again.",
    helpful: 24,
  },
  {
    id: "2",
    user: "John D.",
    rating: 4,
    date: "2024-01-08",
    comment: "Good product, fast delivery. The taste is a bit strong but effective.",
    helpful: 12,
  },
  {
    id: "3",
    user: "Lisa K.",
    rating: 5,
    date: "2024-01-05",
    comment: "This is my third order. Consistent quality and great customer service from the vendor.",
    helpful: 18,
  },
]

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  const product = products[productId] || products["1"]

  const [quantity, setQuantity] = useState(1)
  const [newReview, setNewReview] = useState("")
  const [selectedRating, setSelectedRating] = useState(5)

  const { addItem } = useCart()
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[0],
    })
    toast.success(`Added ${quantity} item(s) to cart`)
  }

  const handleToggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast.success("Removed from wishlist")
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category,
      })
      toast.success("Added to wishlist")
    }
  }

  const handleSubmitReview = () => {
    if (newReview.trim()) {
      toast.success("Review submitted! It will appear after moderation.")
      setNewReview("")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link href="/" className="text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <Link href="/" className="text-muted-foreground hover:text-primary text-sm">
            Home
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link
            href={`/category/${product.category.toLowerCase()}`}
            className="text-muted-foreground hover:text-primary text-sm"
          >
            {product.category}
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground text-sm">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="aspect-square bg-muted rounded-xl overflow-hidden">
            <img
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-2">{product.category}</Badge>
              <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-secondary text-secondary" : "text-muted-foreground"}`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Vendor Info */}
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Store className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{product.vendor}</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-secondary text-secondary" />
                    <span className="text-sm text-muted-foreground">{product.vendorRating} vendor rating</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Visit Store
                </Button>
              </CardContent>
            </Card>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-primary">R{product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">R{product.originalPrice}</span>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 border border-border rounded-lg p-1">
                <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant={isInWishlist(product.id) ? "secondary" : "outline"}
                onClick={handleToggleWishlist}
              >
                <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
              </Button>
            </div>

            {/* Stock Status */}
            <p className="text-sm text-muted-foreground">
              {product.stock > 20 ? (
                <span className="text-green-600">In Stock ({product.stock} available)</span>
              ) : product.stock > 0 ? (
                <span className="text-orange-600">Low Stock (Only {product.stock} left)</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="h-4 w-4 text-primary" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>Secure Payment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs: Description, Features, Reviews */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {product.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              {/* Write Review */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Write a Review</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Your Rating</p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button key={star} onClick={() => setSelectedRating(star)}>
                            <Star
                              className={`h-6 w-6 ${star <= selectedRating ? "fill-secondary text-secondary" : "text-muted-foreground"}`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <Textarea
                      placeholder="Share your experience with this product..."
                      value={newReview}
                      onChange={(e) => setNewReview(e.target.value)}
                      rows={4}
                    />
                    <Button onClick={handleSubmitReview}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Submit Review
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Reviews List */}
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-medium text-foreground">{review.user}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? "fill-secondary text-secondary" : "text-muted-foreground"}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">{review.comment}</p>
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Helpful ({review.helpful})
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
