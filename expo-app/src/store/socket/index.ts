import { io } from 'socket.io-client';
import { create } from 'zustand';

import { env } from '@/env';
import type { AppSocket, SocketStore } from './type';

export const useSocketStore = create<SocketStore>((set, get) => ({
  socket: null,
  connectSocket: (userId?: string) => {
    let { socket } = get();
    if (!socket) {
      socket = io(env.EXPO_PUBLIC_SERVER_URL, {
        autoConnect: false,
      }) as AppSocket;
      set({ socket });
    }

    if (!socket.connected) {
      if (userId) {
        socket.io.opts.query = { id: userId };
      }
      socket.connect();
    }
  },
  disconnectSocket: () => {
    const { socket } = get();
    if (socket?.connected) {
      socket.disconnect();
    }
  },
}));
