import { ActivityIndicator, View } from 'react-native';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';

export function HomeRoomsEmpty() {
  return (
    <View className="items-center justify-center py-8">
      <Text className="text-muted-foreground">No rooms found. Create one!</Text>
    </View>
  );
}

export function HomeRoomsError({ message }: { message?: string }) {
  return (
    <View className="items-center py-8">
      <Text className="text-destructive">Error loading rooms: {message}</Text>
    </View>
  );
}

export function HomeRoomsLoading() {
  return (
    <View className="gap-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Card key={i} className="p-4">
          <Skeleton className="h-5 w-1/2 rounded" />
          <Skeleton className="mt-2 h-3 w-1/4 rounded" />
        </Card>
      ))}
    </View>
  );
}

export function HomeRoomsFooter({ isFetchingNextPage }: { isFetchingNextPage: boolean }) {
  if (!isFetchingNextPage) return null;
  return (
    <View className="items-center py-4">
      <ActivityIndicator />
    </View>
  );
}
