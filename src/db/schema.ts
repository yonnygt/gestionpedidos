import { pgTable, uuid, text, timestamp, numeric, integer } from 'drizzle-orm/pg-core';

export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  sessionId: text('session_id').notNull(),
  status: text('status').default('pending').notNull(),
  totalPrice: numeric('total_price').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  price: numeric('price').notNull(),
  unit: text('unit').notNull(), // e.g., 'kg', 'unit'
  imageUrl: text('image_url'),
});

export const orderItems = pgTable('order_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').references(() => orders.id).notNull(),
  productId: uuid('product_id').references(() => products.id).notNull(),
  quantity: numeric('quantity').notNull(),
  subtotal: numeric('subtotal').notNull(),
});
