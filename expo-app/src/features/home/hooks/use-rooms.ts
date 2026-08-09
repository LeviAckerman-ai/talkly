import { useInfiniteQuery } from '@tanstack/react-query';

import { getRoomsApi } from '../api/get-rooms.api';

export function useRooms() {
  return useInfiniteQuery({
    queryKey: ['rooms'],
    queryFn: ({ pageParam = 1 }) => getRoomsApi({ page: pageParam, limit: 10 }),
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.nextPage : undefined),
    initialPageParam: 1,
    select: (data) => data.pages.flatMap((page) => page.docs),
  });
}
