'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Order {
    id: string;
    sessionId: string;
    status: string;
    totalPrice: string;
    createdAt: string;
}

export function Dashboard() {
    const { data: orders, isLoading, error } = useQuery<Order[]>({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await fetch('/api/orders');
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        },
        refetchInterval: 5000, // Poll every 5 seconds
    });

    if (isLoading) return <div className="p-4">Cargando pedidos...</div>;
    if (error) return <div className="p-4 text-red-500">Error al cargar pedidos</div>;

    return (
        <div className="p-4 space-y-4">
            <h1 className="text-2xl font-bold mb-4">Panel de Carnicería</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {orders?.map((order) => (
                    <Card key={order.id}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Pedido #{order.id.slice(0, 8)}
                            </CardTitle>
                            <Badge variant={order.status === 'pending' ? 'secondary' : 'default'}>
                                {order.status}
                            </Badge>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${order.totalPrice}</div>
                            <p className="text-xs text-muted-foreground">
                                {new Date(order.createdAt).toLocaleString()}
                            </p>
                            <div className="mt-4 text-sm">
                                Sesión: {order.sessionId}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
