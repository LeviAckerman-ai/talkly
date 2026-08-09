import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';

import { User } from '@/db/schemas/user.schema';
import { env } from '@/env';
import { logger } from '@/utils/logger';
import { chatGateway } from './chat.gateway';

export const onlineUsers = new Map<string, { id: string; username: string; avatar?: string }>();

export const initSocket = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: env.CORS_ORIGIN,
      credentials: true,
    },
  });

  io.on('connection', async (socket: Socket) => {
    logger.info(`Socket connected: ${socket.id}`);

    const userId = socket.handshake.query.id as string;
    if (userId) {
      try {
        const user = await User.findById(userId);
        if (user) {
          onlineUsers.set(socket.id, {
            id: user.id,
            username: user.username,
            avatar: (user as any).avatar,
          });
          io.emit('online_users', Array.from(onlineUsers.values()));
        }
      } catch (error) {
        logger.error(error as Error, 'Error fetching user for online users map');
      }
    }

    socket.on('disconnect', () => {
      logger.info(`Socket disconnected: ${socket.id}`);
      if (onlineUsers.has(socket.id)) {
        onlineUsers.delete(socket.id);
        io.emit('online_users', Array.from(onlineUsers.values()));
      }
    });
  });

  chatGateway(io);

  return io;
};
