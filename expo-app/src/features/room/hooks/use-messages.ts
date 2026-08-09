import { IMessage } from '@kesha-antonov/react-native-chat';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getMessagesApi } from '../api/get-messages.api';

export function useMessages(roomId: string) {
  return useInfiniteQuery({
    queryKey: ['messages', roomId],
    queryFn: ({ pageParam = 1 }) => getMessagesApi(roomId, { page: pageParam, limit: 30 }),
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.nextPage : undefined),
    initialPageParam: 1,
    enabled: !!roomId,
    select: (data) => {
      // Flatten all pages into a single array of formatted IMessages
      return data.pages.flatMap((page) =>
        page.docs.map((doc) => ({
          _id: doc._id,
          text: doc.content,
          createdAt: new Date(doc.createdAt).getTime(),
          user: {
            _id: doc.sender._id,
            name: doc.sender.username,
            avatar: doc.sender.avatar,
          },
        })),
      ) as IMessage[];
    },
  });
}
