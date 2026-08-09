import { io, Socket } from 'socket.io-client';

import { env } from '@/env';

export const socket: Socket = io(env.EXPO_PUBLIC_SERVER_URL, {
  autoConnect: false, // Prevents connecting before we decide to (e.g. after login)
});

export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};
