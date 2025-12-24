"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Store,
  Package,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Plus,
  Settings,
  BarChart3,
  Users,
  Bell,
} from "lucide-react"

const stats = [
  { label: "Total Sales", value: "R224,244", change: "+12.5%", icon: DollarSign },
  { label: "Orders", value: "156", change: "+8.2%", icon: ShoppingCart },
  { label: "Products", value: "48", change: "+3", icon: Package },
  { label: "Visitors", value: "2,847", change: "+15.3%", icon: Users },
]

const recentOrders = [
  { id: "BWW-001", customer: "John D.", product: "Organic CBD Oil", amount: "R899", status: "Processing" },
  { id: "BWW-002", customer: "Sarah M.", product: "Hemp Flower Oz", amount: "R1,619", status: "Shipped" },
  { id: "BWW-003", customer: "Mike R.", product: "Delta-8 Gummies", amount: "R629", status: "Delivered" },
  { id: "BWW-004", customer: "Lisa K.", product: "CBD Topical Cream", amount: "R539", status: "Processing" },
]

const statusColors: Record<string, string> = {
  Processing: "bg-yellow-500",
  Shipped: "bg-blue-500",
  Delivered: "bg-green-500",
}

export default function VendorDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <Badge variant="secondary" className="hidden sm:inline-flex">
            <Store className="h-3 w-3 mr-1" />
            Vendor Portal
          </Badge>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Welcome */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome back, Green Leaf Co!</h1>
            <p className="text-muted-foreground">
              {"Here's"} what{"'"}s happening with your store today.
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-green-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Your latest customer orders</CardDescription>
                </div>
                <Link href="/vendor/orders">
                  <Button variant="outline" size="sm" className="bg-transparent">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{order.product}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.id} • {order.customer}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{order.amount}</p>
                      <Badge className={`${statusColors[order.status]} text-white border-0`}>{order.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/vendor/products/new" className="block">
                <div className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Plus className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Add New Product</p>
                    <p className="text-sm text-muted-foreground">List a new item for sale</p>
                  </div>
                </div>
              </Link>
              <Link href="/vendor/analytics" className="block">
                <div className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">View Analytics</p>
                    <p className="text-sm text-muted-foreground">Track your store performance</p>
                  </div>
                </div>
              </Link>
              <Link href="/vendor/settings" className="block">
                <div className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Settings className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Store Settings</p>
                    <p className="text-sm text-muted-foreground">Manage your store details</p>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
