import { NextResponse } from 'next/server';
import { db } from '@/db';
import { orders } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
    try {
        const allOrders = await db.select().from(orders).orderBy(desc(orders.createdAt));
        return NextResponse.json(allOrders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}
