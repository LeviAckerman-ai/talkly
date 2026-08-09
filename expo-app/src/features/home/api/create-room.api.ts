import { env } from '@/env';
import { typedFetch } from '@/lib/fetch';
import { CreateRoomParam, roomSchema } from '../schema/room.schema';

export const createRoomApi = async (data: CreateRoomParam) => {
  return await typedFetch({
    url: `${env.EXPO_PUBLIC_SERVER_URL}/room`,
    method: 'POST',
    body: data,
    schema: roomSchema,
  });
};
