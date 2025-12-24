"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Truck,
  Package,
  CheckCircle,
  Clock,
  MapPin,
  Search,
  ArrowLeft,
  Box,
  Home,
  Plane,
} from "lucide-react"

const mockOrders = [
  {
    id: "BWW-12345678",
    status: "in_transit",
    estimatedDelivery: "Dec 12, 2025",
    items: [
      { name: "Organic CBD Oil 1000mg", quantity: 2 },
      { name: "Hemp Flower Oz", quantity: 1 },
    ],
    tracking: [
      { status: "Order Placed", date: "Dec 8, 2025", time: "10:30 AM", completed: true },
      { status: "Processing", date: "Dec 8, 2025", time: "2:45 PM", completed: true },
      { status: "Shipped", date: "Dec 9, 2025", time: "9:15 AM", completed: true },
      { status: "In Transit", date: "Dec 10, 2025", time: "11:00 AM", completed: true, current: true },
      { status: "Out for Delivery", date: "Dec 12, 2025", time: "", completed: false },
      { status: "Delivered", date: "", time: "", completed: false },
    ],
    carrier: "FedEx",
    trackingNumber: "794644790138",
  },
  {
    id: "BWW-87654321",
    status: "delivered",
    estimatedDelivery: "Dec 5, 2025",
    items: [{ name: "Multi-Surface Cleaner", quantity: 3 }],
    tracking: [
      { status: "Order Placed", date: "Dec 1, 2025", time: "3:20 PM", completed: true },
      { status: "Processing", date: "Dec 1, 2025", time: "5:00 PM", completed: true },
      { status: "Shipped", date: "Dec 2, 2025", time: "8:30 AM", completed: true },
      { status: "In Transit", date: "Dec 3, 2025", time: "10:00 AM", completed: true },
      { status: "Out for Delivery", date: "Dec 5, 2025", time: "7:00 AM", completed: true },
      { status: "Delivered", date: "Dec 5, 2025", time: "2:30 PM", completed: true },
    ],
    carrier: "UPS",
    trackingNumber: "1Z999AA10123456784",
  },
]

const statusIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Order Placed": Box,
  Processing: Clock,
  Shipped: Package,
  "In Transit": Plane,
  "Out for Delivery": Truck,
  Delivered: Home,
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500",
  processing: "bg-blue-500",
  shipped: "bg-purple-500",
  in_transit: "bg-orange-500",
  out_for_delivery: "bg-cyan-500",
  delivered: "bg-green-500",
}

export default function DeliveryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedOrder, setSelectedOrder] = useState(mockOrders[0])

  useEffect(() => {
    console.log("[v0] Delivery page mounted successfully")
  }, [])

  const filteredOrders = mockOrders.filter((order) => order.id.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Track Your Delivery</h1>
          <p className="text-muted-foreground">Enter your order number to track your package</p>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter order number (e.g., BWW-12345678)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button>Track Order</Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Orders List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="font-semibold text-foreground mb-4">Your Orders</h2>
            {filteredOrders.map((order) => (
              <Card
                key={order.id}
                className={`cursor-pointer transition-all ${selectedOrder.id === order.id ? "ring-2 ring-primary" : "hover:shadow-md"}`}
                onClick={() => setSelectedOrder(order)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm font-medium">{order.id}</span>
                    <Badge
                      className={`${statusColors[order.status]} text-white border-0`}
                      variant={order.status === "delivered" ? "default" : "secondary"}
                    >
                      {order.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {order.items.length} item{order.items.length > 1 ? "s" : ""}
                  </p>
                  <p className="text-xs text-muted-foreground">Est. delivery: {order.estimatedDelivery}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Order {selectedOrder.id}
                    </CardTitle>
                    <CardDescription>Shipped via {selectedOrder.carrier}</CardDescription>
                  </div>
                  <Badge
                    className={`${statusColors[selectedOrder.status]} text-white border-0`}
                    variant={selectedOrder.status === "delivered" ? "default" : "secondary"}
                  >
                    {selectedOrder.status.replace("_", " ")}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Tracking Timeline */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Tracking Progress</h3>
                  <div className="relative">
                    {selectedOrder.tracking.map((step, index) => {
                      const Icon = statusIcons[step.status] || Package
                      return (
                        <div key={step.status} className="flex gap-4 pb-6 last:pb-0">
                          <div className="relative flex flex-col items-center">
                            <div
                              className={`h-10 w-10 rounded-full flex items-center justify-center ${
                                step.completed
                                  ? step.current
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-primary/20 text-primary"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {step.completed && !step.current ? (
                                <CheckCircle className="h-5 w-5" />
                              ) : (
                                <Icon className="h-5 w-5" />
                              )}
                            </div>
                            {index < selectedOrder.tracking.length - 1 && (
                              <div
                                className={`w-0.5 flex-1 mt-2 ${step.completed ? "bg-primary" : "bg-muted"}`}
                                style={{ minHeight: "2rem" }}
                              />
                            )}
                          </div>
                          <div className="flex-1 pt-1">
                            <p className={`font-medium ${step.current ? "text-primary" : "text-foreground"}`}>
                              {step.status}
                            </p>
                            {step.date && (
                              <p className="text-sm text-muted-foreground">
                                {step.date} {step.time && `at ${step.time}`}
                              </p>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Items in this Order</h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="text-foreground">{item.name}</span>
                        <span className="text-muted-foreground">x{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tracking Number */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Tracking Number</p>
                      <p className="font-mono font-medium">{selectedOrder.trackingNumber}</p>
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <MapPin className="h-4 w-4 mr-2" />
                      Track on {selectedOrder.carrier}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
