-- Seed initial categories for Buddies World Wide

INSERT INTO categories (name, slug, description, image_url, sort_order) VALUES
  ('420 Zone', '420', 'Premium cannabis products, CBD oils, edibles, and accessories', '/category-420.jpg', 1),
  ('Fruits & Vegetables', 'fruits-vegetables', 'Fresh, locally-sourced fruits and vegetables delivered to your door', '/category-fruits.jpg', 2),
  ('Household Essentials', 'household', 'Everyday household items, cleaning supplies, and home basics', '/category-household.jpg', 3),
  ('Snacks & Beverages', 'snacks', 'Delicious snacks, drinks, and treats for any occasion', '/category-snacks.jpg', 4),
  ('Delivery Services', 'delivery', 'Express delivery, same-day shipping, and logistics services', '/category-delivery.jpg', 5)
ON CONFLICT (slug) DO NOTHING;

-- Sub-categories for 420 Zone
INSERT INTO categories (name, slug, description, parent_id, sort_order) 
SELECT 'CBD Products', '420-cbd', 'CBD oils, tinctures, and wellness products', id, 1 FROM categories WHERE slug = '420'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO categories (name, slug, description, parent_id, sort_order) 
SELECT 'Edibles', '420-edibles', 'Cannabis-infused gummies, chocolates, and treats', id, 2 FROM categories WHERE slug = '420'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO categories (name, slug, description, parent_id, sort_order) 
SELECT 'Accessories', '420-accessories', 'Vapes, grinders, pipes, and smoking accessories', id, 3 FROM categories WHERE slug = '420'
ON CONFLICT (slug) DO NOTHING;

-- Sub-categories for Fruits & Vegetables
INSERT INTO categories (name, slug, description, parent_id, sort_order) 
SELECT 'Fresh Fruits', 'fresh-fruits', 'Seasonal and exotic fruits', id, 1 FROM categories WHERE slug = 'fruits-vegetables'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO categories (name, slug, description, parent_id, sort_order) 
SELECT 'Fresh Vegetables', 'fresh-vegetables', 'Organic and farm-fresh vegetables', id, 2 FROM categories WHERE slug = 'fruits-vegetables'
ON CONFLICT (slug) DO NOTHING;

-- Sub-categories for Household
INSERT INTO categories (name, slug, description, parent_id, sort_order) 
SELECT 'Cleaning Supplies', 'cleaning-supplies', 'Detergents, cleaners, and sanitizers', id, 1 FROM categories WHERE slug = 'household'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO categories (name, slug, description, parent_id, sort_order) 
SELECT 'Kitchen Essentials', 'kitchen-essentials', 'Cookware, utensils, and kitchen gadgets', id, 2 FROM categories WHERE slug = 'household'
ON CONFLICT (slug) DO NOTHING;

-- Sub-categories for Snacks
INSERT INTO categories (name, slug, description, parent_id, sort_order) 
SELECT 'Chips & Crisps', 'chips-crisps', 'Potato chips, corn chips, and crisps', id, 1 FROM categories WHERE slug = 'snacks'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO categories (name, slug, description, parent_id, sort_order) 
SELECT 'Beverages', 'beverages', 'Soft drinks, juices, and energy drinks', id, 2 FROM categories WHERE slug = 'snacks'
ON CONFLICT (slug) DO NOTHING;

-- Create default delivery zones for South Africa
INSERT INTO delivery_zones (name, provinces, is_active) VALUES
  ('Gauteng Metro', ARRAY['Gauteng'], true),
  ('Cape Town Metro', ARRAY['Western Cape'], true),
  ('KZN Metro', ARRAY['KwaZulu-Natal'], true),
  ('National', ARRAY['Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape', 'Free State', 'Limpopo', 'Mpumalanga', 'North West', 'Northern Cape'], true)
ON CONFLICT DO NOTHING;

-- Create default shipping rates
INSERT INTO shipping_rates (zone_id, name, description, price, free_shipping_threshold, estimated_days_min, estimated_days_max, is_active)
SELECT id, 'Standard Delivery', 'Delivery within 3-5 business days', 99.00, 500.00, 3, 5, true FROM delivery_zones WHERE name = 'Gauteng Metro'
ON CONFLICT DO NOTHING;

INSERT INTO shipping_rates (zone_id, name, description, price, free_shipping_threshold, estimated_days_min, estimated_days_max, is_active)
SELECT id, 'Express Delivery', 'Next-day delivery', 249.00, 1000.00, 1, 1, true FROM delivery_zones WHERE name = 'Gauteng Metro'
ON CONFLICT DO NOTHING;

INSERT INTO shipping_rates (zone_id, name, description, price, free_shipping_threshold, estimated_days_min, estimated_days_max, is_active)
SELECT id, 'National Standard', 'Delivery within 5-7 business days', 149.00, 750.00, 5, 7, true FROM delivery_zones WHERE name = 'National'
ON CONFLICT DO NOTHING;
