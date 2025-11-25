# 🥩 ButcherAI - Gestor de Pedidos Inteligente

Un sistema moderno de gestión de pedidos para carnicerías con inteligencia artificial multimodal, diseñado como una PWA mobile-first.

## ✨ Características

- **🤖 Chat AI Multimodal**: Interactúa mediante texto o voz con Google Gemini 2.5 Flash
- **🎙️ Transcripción de Voz**: Convierte audio a texto usando IA
- **📊 Dashboard en Tiempo Real**: Visualiza pedidos con actualización automática
- **🔐 Autenticación QR**: Sistema de sesiones basado en códigos QR con Upstash Redis
- **📱 Mobile-First PWA**: Experiencia optimizada para dispositivos móviles
- **⚡ Streaming de Respuestas**: Respuestas de IA en tiempo real con streaming

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 16** - Framework React con App Router
- **React 19** - Biblioteca UI
- **TailwindCSS 4** - Estilos utility-first
- **TanStack Query** - Gestión de estado del servidor
- **Lucide React** - Iconos

### Backend & Database
- **PostgreSQL** - Base de datos relacional
- **Drizzle ORM** - Type-safe ORM
- **Upstash Redis** - Gestión de sesiones

### AI & APIs
- **Google Gemini 2.5 Flash** - Modelo de IA multimodal
- **Vercel AI SDK** - Integración de IA y streaming
- **@ai-sdk/google** - Provider de Google para AI SDK

## 📋 Prerequisitos

- Node.js 20 o superior
- PostgreSQL 14 o superior
- Cuenta de Upstash Redis
- API Key de Google Gemini

## 🚀 Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd gestionpedidos
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Copia el archivo `.env.example` a `.env`:
```bash
cp .env.example .env
```

Luego edita `.env` con tus credenciales:
```env
# Database (PostgreSQL)
DATABASE_URL="postgres://user:password@localhost:5432/butcher_ai"

# Redis (Upstash)
UPSTASH_REDIS_REST_URL="https://your-redis-url.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-redis-token"

# AI (Google Gemini)
GOOGLE_GENERATIVE_AI_API_KEY="your-google-ai-api-key"
```

4. **Inicializar la base de datos**

Ejecuta el script SQL de inicialización:
```bash
psql -U postgres -d butcher_ai -f src/db/init.sql
```

O usa Drizzle Kit para las migraciones:
```bash
npm run db:push
```

5. **Ejecutar el servidor de desarrollo**
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
gestionpedidos/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   │   ├── chat/          # Endpoints de chat
│   │   │   │   ├── send/      # Envío de mensajes
│   │   │   │   └── transcribe/ # Transcripción de audio
│   │   │   ├── orders/        # Gestión de pedidos
│   │   │   └── qr/            # Autenticación QR
│   │   └── page.tsx           # Página principal
│   ├── components/            # Componentes React
│   │   ├── features/          # Componentes de funcionalidades
│   │   │   ├── ChatInterface.tsx
│   │   │   ├── AudioRecorder.tsx
│   │   │   └── Dashboard.tsx
│   │   └── ui/                # Componentes UI reutilizables
│   ├── db/                    # Database
│   │   ├── schema.ts          # Drizzle schema
│   │   ├── init.sql           # Script de inicialización
│   │   └── index.ts           # Cliente de DB
│   └── lib/                   # Utilidades
│       └── utils.ts
├── .env.example               # Ejemplo de variables de entorno
├── package.json
└── README.md
```

## 🗄️ Schema de Base de Datos

### Tablas

- **orders**: Pedidos de clientes
  - id, sessionId, status, totalPrice, createdAt

- **products**: Catálogo de productos
  - id, name, price, unit, imageUrl

- **orderItems**: Items de cada pedido
  - id, orderId, productId, quantity, subtotal

## 🔌 API Endpoints

### Chat
- `POST /api/chat/send` - Enviar mensaje de chat (con streaming)
- `POST /api/chat/transcribe` - Transcribir audio a texto

### Pedidos
- `GET /api/orders` - Obtener lista de pedidos
- `POST /api/orders` - Crear nuevo pedido

### Autenticación
- `GET /api/qr/generate` - Generar código QR
- `POST /api/qr/validate` - Validar sesión QR

## 🎯 Uso

### Chat AI
1. Navega a la interfaz principal
2. Escribe un mensaje o usa el botón de micrófono para grabar audio
3. La IA te ayudará a gestionar pedidos, consultar productos y más

### Dashboard
1. Visualiza todos los pedidos en tiempo real
2. Los pedidos se actualizan automáticamente cada 5 segundos
3. Filtra por estado: pendiente, procesando, completado

### Autenticación QR
1. Genera un código QR desde el dashboard
2. Escanea con un dispositivo móvil
3. La sesión persiste durante 24 horas

## 🧪 Scripts Disponibles

```bash
npm run dev        # Servidor de desarrollo
npm run build      # Build de producción
npm run start      # Servidor de producción
npm run lint       # Ejecutar linter
```

## 🌐 Deploy

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Deploy automático en cada push

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Variables de Entorno en Producción

Asegúrate de configurar todas las variables de entorno en tu plataforma de hosting:
- `DATABASE_URL`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `GOOGLE_GENERATIVE_AI_API_KEY`

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es privado y está protegido por derechos de autor.

## 🆘 Soporte

Si encuentras algún problema o tienes preguntas, por favor abre un issue en el repositorio.

---

Desarrollado con ❤️ para revolucionar la gestión de pedidos en carnicerías
