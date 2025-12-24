"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Search,
  Plus,
  Minus,
  History,
  Download,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

interface InventoryProduct {
  id: string
  name: string
  sku: string | null
  stock_quantity: number
  low_stock_threshold: number
  status: string
  images: string[]
}

interface InventoryMovement {
  id: string
  movement_type: string
  quantity: number
  previous_quantity: number
  new_quantity: number
  notes: string | null
  created_at: string
}

export default function InventoryPage() {
  const [products, setProducts] = useState<InventoryProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [showLowStock, setShowLowStock] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<InventoryProduct | null>(null)
  const [adjustmentDialogOpen, setAdjustmentDialogOpen] = useState(false)
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false)
  const [movementHistory, setMovementHistory] = useState<InventoryMovement[]>([])
  const [adjustmentData, setAdjustmentData] = useState({
    type: "restock",
    quantity: 0,
    notes: "",
  })

  useEffect(() => {
    fetchInventory()
  }, [showLowStock])

  const fetchInventory = async () => {
    setLoading(true)
    try {
      const url = showLowStock ? "/api/inventory?low_stock=true" : "/api/inventory"
      const res = await fetch(url)
      const data = await res.json()
      setProducts(data.products || [])
    } catch {
      toast.error("Failed to load inventory")
    } finally {
      setLoading(false)
    }
  }

  const fetchMovementHistory = async (productId: string) => {
    try {
      const res = await fetch(`/api/inventory/${productId}/history`)
      const data = await res.json()
      setMovementHistory(data.movements || [])
    } catch {
      toast.error("Failed to load history")
    }
  }

  const handleAdjustment = async () => {
    if (!selectedProduct) return

    const adjustment =
      adjustmentData.type === "restock" || adjustmentData.type === "return"
        ? Math.abs(adjustmentData.quantity)
        : -Math.abs(adjustmentData.quantity)

    try {
      const res = await fetch("/api/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: selectedProduct.id,
          adjustment,
          movement_type: adjustmentData.type,
          notes: adjustmentData.notes,
        }),
      })

      if (!res.ok) throw new Error()

      toast.success("Inventory updated successfully")
      setAdjustmentDialogOpen(false)
      setAdjustmentData({ type: "restock", quantity: 0, notes: "" })
      fetchInventory()
    } catch {
      toast.error("Failed to update inventory")
    }
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const lowStockCount = products.filter((p) => p.stock_quantity <= p.low_stock_threshold).length
  const outOfStockCount = products.filter((p) => p.stock_quantity <= 0).length
  const totalStock = products.reduce((sum, p) => sum + p.stock_quantity, 0)

  const getStockStatus = (product: InventoryProduct) => {
    if (product.stock_quantity <= 0) return { label: "Out of Stock", variant: "destructive" as const }
    if (product.stock_quantity <= product.low_stock_threshold)
      return { label: "Low Stock", variant: "outline" as const }
    return { label: "In Stock", variant: "secondary" as const }
  }

  const getMovementTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      purchase: "Purchase",
      sale: "Sale",
      adjustment: "Adjustment",
      return: "Return",
      transfer: "Transfer",
      damage: "Damage",
      restock: "Restock",
    }
    return labels[type] || type
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/vendor/dashboard" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold">Inventory Management</h1>
              <p className="text-sm text-muted-foreground">Track and manage your product stock</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={fetchInventory}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Products</p>
                  <p className="text-2xl font-bold">{products.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Stock</p>
                  <p className="text-2xl font-bold">{totalStock}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Low Stock</p>
                  <p className="text-2xl font-bold">{lowStockCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-destructive/10">
                  <TrendingDown className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Out of Stock</p>
                  <p className="text-2xl font-bold">{outOfStockCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant={showLowStock ? "default" : "outline"} onClick={() => setShowLowStock(!showLowStock)}>
            <AlertTriangle className="h-4 w-4 mr-2" />
            Low Stock Only
          </Button>
        </div>

        {/* Inventory Table */}
        <Card>
          <CardHeader>
            <CardTitle>Product Inventory</CardTitle>
            <CardDescription>{filteredProducts.length} products found</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No products found</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead className="text-center">Stock</TableHead>
                    <TableHead className="text-center">Threshold</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => {
                    const status = getStockStatus(product)
                    return (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded overflow-hidden bg-muted">
                              <Image
                                src={product.images?.[0] || "/placeholder.svg?height=40&width=40&query=product"}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="font-medium">{product.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{product.sku || "-"}</TableCell>
                        <TableCell className="text-center font-medium">{product.stock_quantity}</TableCell>
                        <TableCell className="text-center text-muted-foreground">
                          {product.low_stock_threshold}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant={status.variant}>{status.label}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Dialog
                              open={historyDialogOpen && selectedProduct?.id === product.id}
                              onOpenChange={(open) => {
                                setHistoryDialogOpen(open)
                                if (open) {
                                  setSelectedProduct(product)
                                  fetchMovementHistory(product.id)
                                }
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <History className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Stock History - {product.name}</DialogTitle>
                                  <DialogDescription>Recent inventory movements for this product</DialogDescription>
                                </DialogHeader>
                                <div className="max-h-96 overflow-y-auto">
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead className="text-right">Change</TableHead>
                                        <TableHead className="text-right">New Qty</TableHead>
                                        <TableHead>Notes</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {movementHistory.map((movement) => (
                                        <TableRow key={movement.id}>
                                          <TableCell className="text-sm">
                                            {new Date(movement.created_at).toLocaleDateString()}
                                          </TableCell>
                                          <TableCell>
                                            <Badge variant="outline">
                                              {getMovementTypeLabel(movement.movement_type)}
                                            </Badge>
                                          </TableCell>
                                          <TableCell
                                            className={`text-right font-medium ${
                                              movement.quantity > 0 ? "text-green-600" : "text-red-600"
                                            }`}
                                          >
                                            {movement.quantity > 0 ? "+" : ""}
                                            {movement.quantity}
                                          </TableCell>
                                          <TableCell className="text-right">{movement.new_quantity}</TableCell>
                                          <TableCell className="text-sm text-muted-foreground">
                                            {movement.notes || "-"}
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                              </DialogContent>
                            </Dialog>

                            <Dialog
                              open={adjustmentDialogOpen && selectedProduct?.id === product.id}
                              onOpenChange={(open) => {
                                setAdjustmentDialogOpen(open)
                                if (open) setSelectedProduct(product)
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  Adjust
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Adjust Stock - {product.name}</DialogTitle>
                                  <DialogDescription>Current stock: {product.stock_quantity} units</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="space-y-2">
                                    <Label>Adjustment Type</Label>
                                    <Select
                                      value={adjustmentData.type}
                                      onValueChange={(value) => setAdjustmentData({ ...adjustmentData, type: value })}
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="restock">
                                          <div className="flex items-center gap-2">
                                            <Plus className="h-4 w-4 text-green-600" />
                                            Restock
                                          </div>
                                        </SelectItem>
                                        <SelectItem value="return">
                                          <div className="flex items-center gap-2">
                                            <Plus className="h-4 w-4 text-green-600" />
                                            Return
                                          </div>
                                        </SelectItem>
                                        <SelectItem value="damage">
                                          <div className="flex items-center gap-2">
                                            <Minus className="h-4 w-4 text-red-600" />
                                            Damage/Loss
                                          </div>
                                        </SelectItem>
                                        <SelectItem value="adjustment">
                                          <div className="flex items-center gap-2">
                                            <Minus className="h-4 w-4 text-red-600" />
                                            Manual Adjustment
                                          </div>
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Quantity</Label>
                                    <Input
                                      type="number"
                                      min="1"
                                      value={adjustmentData.quantity}
                                      onChange={(e) =>
                                        setAdjustmentData({
                                          ...adjustmentData,
                                          quantity: Number.parseInt(e.target.value) || 0,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Notes (optional)</Label>
                                    <Textarea
                                      value={adjustmentData.notes}
                                      onChange={(e) => setAdjustmentData({ ...adjustmentData, notes: e.target.value })}
                                      placeholder="Reason for adjustment..."
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setAdjustmentDialogOpen(false)}>
                                    Cancel
                                  </Button>
                                  <Button onClick={handleAdjustment} disabled={adjustmentData.quantity <= 0}>
                                    Update Stock
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
