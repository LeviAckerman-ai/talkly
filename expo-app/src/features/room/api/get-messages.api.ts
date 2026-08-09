import { env } from '@/env';
import { PaginationQueryParam } from '@/features/home/schema/pagination.schema';
import { typedFetch } from '@/lib/fetch';
import { paginatedMessagesSchema } from '../schema/message.schema';

export const getMessagesApi = async (roomId: string, query: PaginationQueryParam) => {
  return await typedFetch({
    url: `${env.EXPO_PUBLIC_SERVER_URL}/message/room/${roomId}`,
    method: 'GET',
    query,
    schema: paginatedMessagesSchema,
  });
};
