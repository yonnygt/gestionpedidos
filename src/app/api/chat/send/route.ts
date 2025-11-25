import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const result = streamText({
        model: google('gemini-2.5-flash'),
        messages,
        system: `Eres un asistente virtual para una carnicería llamada "ButcherAI".
    Tu objetivo es ayudar a los clientes a realizar pedidos.
    
    Catálogo de productos (Simulado):
    - Lomo Vetado: $15.99/kg
    - Pollo Entero: $5.99/kg
    - Chorizo Artesanal: $8.50/kg
    - Costillar de Cerdo: $12.00/kg
    
    Si el cliente pide algo, confirma el pedido y el precio estimado.
    Sé amable y conciso.`,
    });

    return result.toTextStreamResponse();
}
