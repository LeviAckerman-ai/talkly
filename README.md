# Talkly

Talkly is a modern, real-time event-driven chat application designed for web and mobile platforms. Built as a monorepo, it features a scalable Node.js/Express backend paired with a React Native Expo frontend. 

## 🚀 Features

- **Real-Time Event-Driven Architecture:** Uses Socket.io for instantaneous bidirectional communication, minimizing latency for messages and events.
- **Cross-Platform Frontend:** A unified Expo React Native codebase that deploys beautifully to Web (Vercel), Android, and iOS.
- **Live Typing Indicators:** Real-time visibility into when users are actively typing in a chat room (via `typing_start` and `typing_end` socket events).
- **Online User Tracking:** A real-time global state maps socket connections to database users, dynamically tracking and broadcasting currently online users across the application.
- **Dynamic Routing & Headers:** Expo Router dynamically handles room navigation, injecting context like room names directly into the native Stack headers.
- **Modern UI/UX:** Styled natively using Uniwind (Tailwind CSS) and accessible UI primitives for a sleek, responsive design on all screen sizes.
- **Robust API & Data Management:** 
  - Express.js REST API with strict Zod validation.
  - MongoDB & Mongoose for reliable data persistence and pagination.
  - OpenAPI/Swagger integration via `@scalar/express-api-reference`.
  - Intelligent frontend state management via Zustand (Auth & Socket states) and React Query (API data caching).

## 🏗 Architecture & Stack

### Frontend (`expo-app`)
- **Framework:** Expo (React Native) + Expo Router
- **Web Deployment:** Vercel (Configured as a Static SPA with custom rewrites)
- **State Management:** Zustand + React Query
- **Styling:** Uniwind (Tailwind CSS for React Native)
- **Chat UI Component:** `@kesha-antonov/react-native-chat`

#### Frontend Structure
The frontend is built using a feature-based architecture to maintain scalability:
- `src/app/` - Expo Router file-based navigation (auth and main app routes).
- `src/features/` - Encapsulated domains (e.g., `auth`, `home`, `room`) containing their own components, API hooks, and schemas.
- `src/store/` - Global Zustand stores (`auth` state, `socket` connection map).
- `src/components/` - Shared UI primitives and layout components.
- `src/hooks/` - Reusable React hooks.
- `src/lib/` - Utility functions and API clients.

### Backend (`server`)
- **Framework:** Node.js with Express.js
- **Database:** MongoDB (Mongoose)
- **Real-time Engine:** Socket.io
- **Validation:** Zod (`express-zod-safe`)
- **Security & Logging:** Helmet, CORS, Rate Limiting, Pino Logger

#### Backend Structure
The backend uses a layered architecture to cleanly separate concerns:
- `src/routes/` - Express route definitions and endpoint grouping.
- `src/controllers/` - Request handlers that parse inputs and send HTTP responses.
- `src/services/` - Core business logic and database interactions.
- `src/db/` - Mongoose schemas and models.
- `src/dto/` - Zod schemas (Data Transfer Objects) for robust request validation and OpenAPI types.
- `src/gateways/` - Socket.io real-time event listeners and broadcasters.
- `src/middlewares/` - Custom Express middlewares (error handling, logging, rate-limiting).
- `src/utils/` - Shared utilities like Pino logger and OpenAPI generation.

## 📡 Event-Driven System

Talkly relies on a real-time event-driven approach rather than traditional REST polling for interactive features:
1. **Connection State:** The `socket.gateway` maintains a dynamic in-memory map of connected clients, mapping socket IDs to authenticated users and broadcasting the `online_users` payload globally.
2. **Chat Gateway:** The `chat.gateway` listens for `join_room`, `send_message`, `typing_start`, and `typing_end` events. It efficiently relays these events specifically to relevant room subscribers.
3. **Frontend Integration:** The Expo app maintains a persistent Socket connection via a global Zustand store. It binds to component lifecycles (like `useEffect` in the Chat screen) to listen and dispatch events asynchronously, providing a snappy, native-like chat experience on both mobile and web.

## 💻 Getting Started

### Prerequisites
- Node.js
- pnpm
- MongoDB

### Installation

1. **Install dependencies from the root:**
   ```bash
   pnpm install
   ```

2. **Configure Environment Variables:**
   - In `server/`, copy `.env.example` to `.env` and set your `MONGO_URI`.
   - In `expo-app/`, configure your `.env` to point `EXPO_PUBLIC_SERVER_URL` to your local server.

3. **Start the Server:**
   ```bash
   cd server
   pnpm run dev
   ```

4. **Start the Expo App:**
   ```bash
   cd expo-app
   pnpm run android # For Android Emulator
   pnpm run web     # For Local Web Testing
   ```

### 🚀 Production Deployment
- **Web App:** Ready to be deployed to Vercel. Run `pnpm run build:web` to generate static files, and Vercel will handle the routing via the provided `vercel.json`.
- **Server:** Ready to be deployed on Render, Railway, or any Node.js hosting provider that supports WebSockets. PM2 can be used for process management via `pm2 start dist/index.js`.
