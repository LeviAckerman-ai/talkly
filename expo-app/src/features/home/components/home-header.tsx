import React from 'react';
import { View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useAuthStore } from '@/store/auth';
import { CreateRoomForm } from './create-room-form';

export function HomeHeader() {
  const { user, removeUser } = useAuthStore((state) => state);

  return (
    <View className="mb-4 gap-6">
      <View className="flex-row items-center justify-between">
        <View className="mr-4 flex-1">
          <Text variant="h1" numberOfLines={1}>
            Hello, {user?.username}!
          </Text>
          <Text className="text-muted-foreground text-sm" numberOfLines={1}>
            ID: {user?.id}
          </Text>
        </View>

        <Button variant="destructive" onPress={removeUser}>
          <Text>Logout</Text>
        </Button>
      </View>

      <View className="flex-row items-center justify-between">
        <Text variant="h2">Rooms</Text>
        <CreateRoomForm />
      </View>
    </View>
  );
}
