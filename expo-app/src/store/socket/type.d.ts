import { IMessage } from '@kesha-antonov/react-native-chat';
import { Socket } from 'socket.io-client';

export interface ServerToClientEvents {
  receive_message: (message: IMessage) => void;
}

export interface ClientToServerEvents {
  join_room: (roomId: string) => void;
  leave_room: (roomId: string) => void;
  send_message: (payload: { roomId: string; message: IMessage }) => void;
}

export type AppSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

export interface SocketStore {
  socket: AppSocket | null;
  connectSocket: (userId?: string) => void;
  disconnectSocket: () => void;
}
