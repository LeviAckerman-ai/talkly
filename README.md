# Talkly

Talkly is a real-time, multi-room chat application built for web and Android. It uses React Native with Expo for the frontend, Node.js and Express for the backend, MongoDB for persistent data storage, and Socket.IO for real-time communication.

The application supports username-based login, real-time messaging, multiple chat rooms, typing indicators, online user presence, and persistent chat history.

---

## 🌐 Live Demo & Documentation

* **Web Application:** [Talkly Web App](https://talkly-web.vercel.app/?utm_source=chatgpt.com)
* **Android APK:** [Download Android APK](https://drive.google.com/file/d/1RQ59G_kc8kH6j7gBe4v6MXYKqdfGsYf8/view?usp=sharing&utm_source=chatgpt.com)
* **API Documentation:** [Swagger / API Docs](https://knozify.space/docs?utm_source=chatgpt.com)

---

## ✨ Features

### Core Features

* Username-based dummy login
* Real-time messaging using Socket.IO
* Multiple chat rooms
* Create and join chat rooms
* Persistent message history using MongoDB
* REST APIs for chat data
* Message timestamps
* Real-time message broadcasting
* Connection and disconnection handling
* Responsive interface for Web and Android

### Bonus Features

* Typing indicators
* Online/offline user presence
* Multiple user-created chat rooms
* Real-time room-based message broadcasting

---

## 🧰 Tech Stack

### Frontend

* React Native
* Expo
* Expo Router
* TypeScript
* Zustand
* TanStack React Query
* Uniwind / Tailwind CSS
* Socket.IO Client
* `@kesha-antonov/react-native-chat`

### Backend

* Node.js
* Express.js
* TypeScript
* Socket.IO
* MongoDB
* Mongoose
* Zod
* Pino
* Helmet
* CORS
* Rate Limiting

### Deployment

* Web: Vercel
* Database: MongoDB
* Android: Expo-built APK
* Backend: Node.js server with WebSocket support

---

## 📚 API Documentation

The backend REST APIs are documented using Swagger/OpenAPI.

The interactive API documentation provides:

* Available REST endpoints
* Request parameters and payloads
* Response schemas
* Validation requirements
* HTTP status codes
* Interactive API testing

**Swagger / API Docs:** [Open API Documentation](https://knozify.space/docs?utm_source=chatgpt.com)

---

## 🏗️ Architecture

```text
                         ┌──────────────────────┐
                         │   React Native +     │
                         │   Expo Application   │
                         │                      │
                         │   Web / Android      │
                         └──────────┬───────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                 REST API                       Socket.IO
                    │                               │
                    └───────────────┬───────────────┘
                                    │
                           ┌────────▼────────┐
                           │ Node.js +       │
                           │ Express Server  │
                           └────────┬────────┘
                                    │
                           ┌────────▼────────┐
                           │    MongoDB      │
                           │    Mongoose     │
                           └─────────────────┘
```

The application uses two communication mechanisms for different responsibilities:

* **REST APIs** handle persistent data operations.
* **Socket.IO** handles real-time events and communication.

---

## 📁 Project Structure

```text
talkly/
│
├── expo-app/
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth/
│   │   │   └── main/
│   │   │
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── home/
│   │   │   └── room/
│   │   │
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   └── store/
│   │
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── db/
│   │   ├── dto/
│   │   ├── gateways/
│   │   ├── middlewares/
│   │   └── utils/
│   │
│   └── package.json
│
├── package.json
└── README.md
```

---

## 💬 Chat Architecture

Talkly supports multiple chat rooms.

A user can:

1. Enter a username.
2. View available chat rooms.
3. Create a new room.
4. Join an existing room.
5. Send and receive messages in real time.
6. Leave the room and join another room.

Each Socket.IO connection joins the corresponding room.

```text
User
  │
  ├── Login
  │
  ▼
Room List
  │
  ├── General
  ├── React
  └── Random
       │
       ▼
   Join Room
       │
       ▼
 Socket.IO Room
       │
       ├── Send Message
       ├── Receive Message
       ├── Typing Events
       └── Presence Events
```

Messages are isolated by room, so users only receive real-time messages from the room they have joined.

---

## ⚡ Real-Time Communication

Socket.IO is responsible for the application's real-time functionality.

When the user enters the chat application, the frontend establishes a Socket.IO connection and sends the username as connection metadata.

```text
Client
   │
   │ connect
   ▼
Socket.IO Server
   │
   │ identify user
   ▼
Connection established
```

The server maintains active socket connections and uses them to broadcast real-time events.

---

## 📡 Socket.IO Events

### Connection Events

```text
connect
disconnect
connect_error
```

### Room Events

```text
create_room
join_room
leave_room
```

### Messaging Events

```text
send_message
message:new
```

### Typing Events

```text
typing_start
typing_end
```

### Presence Events

```text
online_users
```

---

## 📨 Message Flow

When a user sends a message:

```text
User
 │
 │ send_message
 ▼
Socket.IO Server
 │
 │ validate data
 ▼
Message Service
 │
 │ save
 ▼
MongoDB
 │
 │ saved message
 ▼
Socket.IO Server
 │
 │ message:new
 ▼
Users in the room
```

The message is persisted before it is broadcast.

This ensures that the real-time message sent to clients represents the message successfully stored in the database.

---

## 🔌 REST APIs

REST APIs are used for persistent data operations such as retrieving previous messages.

### Get Chat History

```http
GET /api/messages/:roomId
```

Returns messages belonging to the specified room.

### Send Message

```http
POST /api/messages
```

Example request:

```json
{
  "roomId": "room_id",
  "message": "Hello everyone!"
}
```

The server validates and persists the message before it is broadcast to connected users.

> Socket.IO is responsible for instant delivery, while REST APIs are used for persistent API operations and retrieving chat history.

---

## 🗄️ Database Design

MongoDB is the persistent source of truth.

### User

```text
users
├── _id
├── username
├── createdAt
└── updatedAt
```

### Room

```text
rooms
├── _id
├── name
├── createdBy
├── createdAt
└── updatedAt
```

### Message

```text
messages
├── _id
├── room
├── sender
├── message
├── createdAt
└── updatedAt
```

Typing state and online presence are not persisted in MongoDB because they are temporary real-time states.

---

## 👤 Username-Based Login

Talkly uses dummy username-based authentication.

The user enters a username before accessing the application.

```text
Username
    │
    ▼
Store locally
    │
    ▼
Open Chat
    │
    ▼
Connect Socket.IO
    │
    ▼
Send username with socket connection
```

No password, JWT, or external authentication provider is used because full authentication is outside the scope of the assignment.

---

## 🟢 Online / Offline Presence

Online presence is handled using active Socket.IO connections.

When a user connects, they become online and the updated online user list is broadcast.

When a user disconnects, they are removed from the active connection list and the updated presence is broadcast.

The server maintains this state in memory because it represents current connection status rather than persistent data.

---

## ✍️ Typing Indicator

Typing indicators are implemented using Socket.IO events.

```text
typing_start
     ↓
Socket.IO
     ↓
Other users in room
     ↓
"Daksh is typing..."

typing_end
     ↓
Socket.IO
     ↓
Typing indicator removed
```

Typing state is not persisted.

---

## 🔄 Persistence and Chat History

MongoDB is the source of truth for persistent messages.

When a user opens a room:

```text
Frontend
   │
   │ GET /api/messages/:roomId
   ▼
Express API
   │
   ▼
MongoDB
   │
   ▼
Previous messages
   │
   ▼
Chat UI
```

This allows messages to remain available after refreshing or reopening the application.

---

## 🎨 Frontend State Management

### Zustand

Zustand manages lightweight global application state such as:

* Current user
* Authentication state
* Socket connection
* Connection status
* Active room

### TanStack React Query

React Query manages server state and API data such as:

* Room lists
* Chat history
* API requests
* Loading states
* Error states
* Cache management

### Socket.IO

Socket.IO handles transient real-time state such as:

* New messages
* Typing indicators
* Online users
* Room events
* Connection status

---

## 🛡️ Validation & Error Handling

The backend uses Zod to validate incoming API data.

The application handles:

* Invalid usernames
* Empty messages
* Invalid room IDs
* Socket connection errors
* API errors
* Database errors
* Client disconnections
* Invalid room operations

The backend uses centralized middleware for consistent error handling and logging.

---

## 🔐 Security

The backend includes basic security measures:

* Helmet
* CORS configuration
* Request validation using Zod
* Rate limiting
* Structured logging
* Input trimming and length validation

---

## ⚙️ Environment Variables

### Backend

Create:

```text
server/.env
```

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:8081
```

### Frontend

Configure:

```env
EXPO_PUBLIC_SERVER_URL=http://localhost:5000
```

For Android devices running on a local network, replace `localhost` with the local IP address of the machine running the backend.

Example:

```env
EXPO_PUBLIC_SERVER_URL=http://192.168.1.10:5000
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js
* pnpm
* MongoDB or MongoDB Atlas
* Expo tooling
* Android Studio / Android Emulator for Android development

### 1. Clone the repository

```bash
git clone <repository-url>
cd talkly
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Configure the backend and Expo environment variables described above.

### 4. Start the backend

```bash
cd server
pnpm run dev
```

### 5. Start the web application

```bash
cd expo-app
pnpm run web
```

### 6. Start the Android application

```bash
cd expo-app
pnpm run android
```

---

## 🌍 Production Deployment

### Web

The web application is deployed using Vercel.

[Talkly Web App](https://talkly-web.vercel.app/?utm_source=chatgpt.com)

### Android

An Android APK is available for testing.

[Talkly Android APK](https://drive.google.com/file/d/1RQ59G_kc8kH6j7gBe4v6MXYKqdfGsYf8/view?usp=sharing&utm_source=chatgpt.com)

### Backend

The backend is deployed as a Node.js server with support for both HTTP REST APIs and Socket.IO WebSocket connections.

---

## 🧠 Design Decisions

### React Native + Expo

React Native allows the same frontend codebase to target Android and Web. Expo simplifies development and application builds, while Expo Router provides file-based navigation.

### Express

Express provides a lightweight HTTP server for the required REST APIs.

### MongoDB + Mongoose

MongoDB provides persistent storage for users, rooms, and messages. Mongoose provides schema definitions, validation, and database access.

### Socket.IO

Socket.IO provides reliable bidirectional communication and room-based broadcasting for real-time features.

### REST + Socket.IO

REST and Socket.IO have separate responsibilities:

```text
REST
 ↓
Persistent API operations
 ↓
Fetch chat history

Socket.IO
 ↓
Real-time events
 ↓
Messages / typing / presence / rooms
```

### Zustand

Zustand provides lightweight global state management for authentication, user state, and Socket.IO state.

### React Query

React Query manages server state, API caching, loading states, and request synchronization.

---

## 📌 Assumptions

* Username-based authentication is intentionally simplified because the assignment specifies dummy authentication as a bonus.
* Users can create and join available chat rooms.
* Messages belong to a specific room.
* Users only receive real-time messages for rooms they have joined.
* MongoDB is the persistent source of truth for messages and rooms.
* Socket.IO handles transient real-time state.
* Online status represents an active Socket.IO connection.
* Typing indicators are temporary and are not stored in MongoDB.
* Message timestamps are generated by the backend/database rather than relying on client-side timestamps.
* Full authentication and authorization are outside the scope of the application.

---

## 📈 Future Improvements

Possible future improvements include:

* Proper authentication with OAuth or password-based authentication
* Private rooms and room permissions
* One-to-one messaging
* Message read/delivery receipts
* Message editing and deletion
* File and image sharing
* Push notifications
* Redis-based presence
* Horizontal backend scaling
* Message search
* End-to-end encryption

These features are outside the current scope of the application.
