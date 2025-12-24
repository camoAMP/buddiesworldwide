// Database types for Buddies World Wide

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  parent_id: string | null
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Vendor {
  id: string
  user_id: string
  business_name: string
  slug: string
  description: string | null
  logo_url: string | null
  banner_url: string | null
  email: string
  phone: string | null
  address: Record<string, unknown> | null
  subscription_tier: "starter" | "professional" | "enterprise"
  subscription_status: "trial" | "active" | "cancelled" | "expired"
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  commission_rate: number
  is_verified: boolean
  is_active: boolean
  rating: number
  total_sales: number
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  vendor_id: string
  category_id: string | null
  name: string
  slug: string
  description: string | null
  short_description: string | null
  price: number
  compare_at_price: number | null
  cost_price: number | null
  sku: string | null
  barcode: string | null
  track_inventory: boolean
  stock_quantity: number
  low_stock_threshold: number
  allow_backorder: boolean
  weight: number | null
  weight_unit: string
  dimensions: Record<string, unknown> | null
  images: string[]
  tags: string[] | null
  status: "draft" | "active" | "archived"
  is_featured: boolean
  requires_shipping: boolean
  meta_title: string | null
  meta_description: string | null
  view_count: number
  sales_count: number
  rating: number
  review_count: number
  created_at: string
  updated_at: string
  vendor?: Vendor
  category?: Category
}

export interface ProductVariant {
  id: string
  product_id: string
  name: string
  sku: string | null
  price: number | null
  compare_at_price: number | null
  stock_quantity: number
  low_stock_threshold: number
  options: Record<string, unknown> | null
  image_url: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface InventoryMovement {
  id: string
  product_id: string
  variant_id: string | null
  movement_type: "purchase" | "sale" | "adjustment" | "return" | "transfer" | "damage" | "restock"
  quantity: number
  previous_quantity: number
  new_quantity: number
  reference_type: string | null
  reference_id: string | null
  notes: string | null
  created_by: string | null
  created_at: string
}

export interface Customer {
  id: string
  user_id: string
  email: string
  first_name: string | null
  last_name: string | null
  phone: string | null
  avatar_url: string | null
  default_address_id: string | null
  total_orders: number
  total_spent: number
  loyalty_points: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CustomerAddress {
  id: string
  customer_id: string
  label: string
  first_name: string
  last_name: string
  company: string | null
  address_line1: string
  address_line2: string | null
  city: string
  province: string
  postal_code: string
  country: string
  phone: string | null
  is_default: boolean
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  order_number: string
  customer_id: string | null
  vendor_id: string | null
  subtotal: number
  discount_amount: number
  shipping_amount: number
  tax_amount: number
  total_amount: number
  currency: string
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded"
  payment_status: "pending" | "paid" | "failed" | "refunded" | "partially_refunded"
  fulfillment_status: "unfulfilled" | "partially_fulfilled" | "fulfilled"
  payment_method: string | null
  payment_reference: string | null
  stripe_payment_intent_id: string | null
  shipping_address: Record<string, unknown> | null
  billing_address: Record<string, unknown> | null
  shipping_method: string | null
  tracking_number: string | null
  tracking_url: string | null
  estimated_delivery: string | null
  shipped_at: string | null
  delivered_at: string | null
  customer_notes: string | null
  internal_notes: string | null
  metadata: Record<string, unknown> | null
  created_at: string
  updated_at: string
  items?: OrderItem[]
  customer?: Customer
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string | null
  variant_id: string | null
  vendor_id: string | null
  product_name: string
  product_sku: string | null
  product_image: string | null
  variant_name: string | null
  unit_price: number
  quantity: number
  discount_amount: number
  tax_amount: number
  total_amount: number
  fulfillment_status: string
  created_at: string
}

export interface CartItem {
  product_id: string
  variant_id?: string
  quantity: number
  product: Product
  variant?: ProductVariant
}

export interface ShippingRate {
  id: string
  zone_id: string
  vendor_id: string | null
  name: string
  description: string | null
  price: number
  free_shipping_threshold: number | null
  estimated_days_min: number | null
  estimated_days_max: number | null
  is_active: boolean
  created_at: string
}

export interface DiscountCode {
  id: string
  vendor_id: string | null
  code: string
  description: string | null
  discount_type: "percentage" | "fixed_amount" | "free_shipping"
  discount_value: number
  minimum_order_amount: number | null
  maximum_discount_amount: number | null
  usage_limit: number | null
  usage_count: number
  is_active: boolean
  starts_at: string | null
  expires_at: string | null
  created_at: string
}
