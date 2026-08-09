import { useCallback, useEffect } from 'react';
import { FlatList, RefreshControl } from 'react-native';

import { HomeHeader } from '@/features/home/components/home-header';
import { HomeRoomCard } from '@/features/home/components/home-room-card';
import {
  HomeRoomsEmpty,
  HomeRoomsError,
  HomeRoomsFooter,
  HomeRoomsLoading,
} from '@/features/home/components/home-rooms-fallback';
import { useRooms } from '@/features/home/hooks/use-rooms';
import { Room } from '@/features/home/schema/room.schema';
import { useRefreshOnFocus } from '@/hooks/use-refresh-on-focus';
import { connectSocket, disconnectSocket, socket } from '@/lib/socket';

export default function HomeScreen() {
  const {
    data: rooms = [],
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useRooms();

  useRefreshOnFocus(refetch);

  useEffect(() => {
    connectSocket();

    socket.on('connect', () => {
      console.log('✅ Socket connected from client:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('❌ Socket disconnected from client');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      disconnectSocket();
    };
  }, []);

  const renderEmpty = useCallback(() => {
    if (isLoading) return <HomeRoomsLoading />;
    if (isError) return <HomeRoomsError message={error?.message} />;
    return <HomeRoomsEmpty />;
  }, [isLoading, isError, error]);

  return (
    <FlatList
      className="flex-1 px-4"
      contentContainerClassName="gap-4 pb-8 pt-4"
      data={rooms}
      keyExtractor={(item: Room) => item.id}
      renderItem={({ item }) => <HomeRoomCard room={item} />}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
      }}
      onEndReachedThreshold={0.5}
      refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
      ListHeaderComponent={<HomeHeader />}
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={<HomeRoomsFooter isFetchingNextPage={isFetchingNextPage} />}
    />
  );
}
