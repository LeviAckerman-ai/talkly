import { env } from '@/env';
import { typedFetch } from '@/lib/fetch';
import { createPaginatedResponseSchema, PaginationQueryParam } from '../schema/pagination.schema';
import { roomSchema } from '../schema/room.schema';

const paginatedRoomsSchema = createPaginatedResponseSchema(roomSchema);

export const getRoomsApi = async (query: PaginationQueryParam) => {
  return await typedFetch({
    url: `${env.EXPO_PUBLIC_SERVER_URL}/room`,
    method: 'GET',
    query,
    schema: paginatedRoomsSchema,
  });
};
