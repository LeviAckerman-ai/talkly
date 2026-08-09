import { IMessage } from '@kesha-antonov/react-native-chat';
import { Socket } from 'socket.io-client';

export interface OnlineUser {
  id: string;
  username: string;
  avatar?: string;
}

export interface ServerToClientEvents {
  receive_message: (message: IMessage) => void;
  online_users: (users: OnlineUser[]) => void;
  user_typing: (payload: { username: string }) => void;
  user_stopped_typing: (payload: { username: string }) => void;
}

export interface ClientToServerEvents {
  join_room: (roomId: string) => void;
  leave_room: (roomId: string) => void;
  send_message: (payload: { roomId: string; message: IMessage }) => void;
  typing_start: (payload: { roomId: string; username: string }) => void;
  typing_end: (payload: { roomId: string; username: string }) => void;
}

export type AppSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

export interface SocketStore {
  socket: AppSocket | null;
  onlineUsers: OnlineUser[];
  connectSocket: (userId?: string) => void;
  disconnectSocket: () => void;
}
