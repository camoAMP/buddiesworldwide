-- Row Level Security Policies for Buddies World Wide

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE discount_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipping_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Categories: Public read, admin write
CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (is_active = true);

-- Vendors: Public read for active, owners can manage
CREATE POLICY "Active vendors are viewable by everyone" ON vendors FOR SELECT USING (is_active = true);
CREATE POLICY "Vendors can update their own profile" ON vendors FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can create vendor profile" ON vendors FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Products: Public read for active, vendors can manage their own
CREATE POLICY "Active products are viewable by everyone" ON products FOR SELECT USING (status = 'active');
CREATE POLICY "Vendors can view all their products" ON products FOR SELECT USING (
  vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid())
);
CREATE POLICY "Vendors can insert their own products" ON products FOR INSERT WITH CHECK (
  vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid())
);
CREATE POLICY "Vendors can update their own products" ON products FOR UPDATE USING (
  vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid())
);
CREATE POLICY "Vendors can delete their own products" ON products FOR DELETE USING (
  vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid())
);

-- Product variants: Same as products
CREATE POLICY "Variants viewable with product" ON product_variants FOR SELECT USING (
  product_id IN (SELECT id FROM products WHERE status = 'active')
);
CREATE POLICY "Vendors can manage variants" ON product_variants FOR ALL USING (
  product_id IN (SELECT id FROM products WHERE vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid()))
);

-- Inventory movements: Vendors can view their own
CREATE POLICY "Vendors can view their inventory movements" ON inventory_movements FOR SELECT USING (
  product_id IN (SELECT id FROM products WHERE vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid()))
);
CREATE POLICY "Vendors can create inventory movements" ON inventory_movements FOR INSERT WITH CHECK (
  product_id IN (SELECT id FROM products WHERE vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid()))
);

-- Customers: Own data only
CREATE POLICY "Customers can view their own profile" ON customers FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Customers can update their own profile" ON customers FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can create customer profile" ON customers FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Customer addresses: Own data only
CREATE POLICY "Customers can manage their addresses" ON customer_addresses FOR ALL USING (
  customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
);

-- Orders: Customers see their own, vendors see orders with their products
CREATE POLICY "Customers can view their orders" ON orders FOR SELECT USING (
  customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
);
CREATE POLICY "Vendors can view orders containing their products" ON orders FOR SELECT USING (
  id IN (SELECT DISTINCT order_id FROM order_items WHERE vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid()))
);
CREATE POLICY "Anyone can create orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Vendors can update order status" ON orders FOR UPDATE USING (
  id IN (SELECT DISTINCT order_id FROM order_items WHERE vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid()))
);

-- Order items: Same as orders
CREATE POLICY "Order items viewable with order" ON order_items FOR SELECT USING (
  order_id IN (SELECT id FROM orders WHERE customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid()))
  OR vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid())
);
CREATE POLICY "Anyone can create order items" ON order_items FOR INSERT WITH CHECK (true);

-- Carts: Own data only
CREATE POLICY "Users can manage their cart" ON carts FOR ALL USING (
  customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  OR session_id IS NOT NULL
);

-- Wishlists: Own data only
CREATE POLICY "Users can manage their wishlist" ON wishlists FOR ALL USING (
  customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
);

-- Reviews: Public read, customers can create
CREATE POLICY "Approved reviews are viewable" ON product_reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Customers can create reviews" ON product_reviews FOR INSERT WITH CHECK (
  customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
);
CREATE POLICY "Customers can update their reviews" ON product_reviews FOR UPDATE USING (
  customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
);

-- Discount codes: Public read for active, vendors manage their own
CREATE POLICY "Active discount codes viewable" ON discount_codes FOR SELECT USING (is_active = true);
CREATE POLICY "Vendors can manage their discount codes" ON discount_codes FOR ALL USING (
  vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid())
);

-- Delivery zones and shipping rates: Public read
CREATE POLICY "Delivery zones viewable" ON delivery_zones FOR SELECT USING (is_active = true);
CREATE POLICY "Shipping rates viewable" ON shipping_rates FOR SELECT USING (is_active = true);

-- Notifications: Own data only
CREATE POLICY "Users can view their notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);
