import { Server, Socket } from 'socket.io';

import { Message } from '@/db/schemas/message.schema';
import { User } from '@/db/schemas/user.schema';
import { logger } from '@/utils/logger';

export const chatGateway = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    const userId = socket.handshake.query.id as string;

    if (userId) {
      logger.info(`User connected to chat: ${userId}, Socket ID: ${socket.id}`);
    }

    socket.on('join_room', (roomId: string) => {
      socket.join(roomId);
      logger.info(`Socket ${socket.id} joined room ${roomId}`);
    });

    socket.on('leave_room', (roomId: string) => {
      socket.leave(roomId);
      logger.info(`Socket ${socket.id} left room ${roomId}`);
    });

    socket.on('send_message', async (payload: { roomId: string; message: any }) => {
      try {
        const { roomId, message } = payload;

        // Save to mongodb
        const savedMessage = await Message.create({
          room: roomId,
          sender: userId || message.user._id, // use query id or fallback to message user id
          content: message.text,
        });

        // Broadcast to everyone in the room except the sender
        socket.to(roomId).emit('receive_message', message);
      } catch (error) {
        logger.error(error as Error, 'Error saving message');
      }
    });
  });
};
