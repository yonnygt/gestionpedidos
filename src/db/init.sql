-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL,
  total_price NUMERIC NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  unit TEXT NOT NULL,
  image_url TEXT
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id),
  product_id UUID NOT NULL REFERENCES products(id),
  quantity NUMERIC NOT NULL,
  subtotal NUMERIC NOT NULL
);

-- Insert some sample products
INSERT INTO products (name, price, unit) VALUES
('Lomo Vetado', 15.99, 'kg'),
('Pollo Entero', 5.99, 'kg'),
('Chorizo Artesanal', 8.50, 'kg'),
('Costillar de Cerdo', 12.00, 'kg');
