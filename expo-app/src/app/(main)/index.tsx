import { useEffect } from 'react';
import { View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { connectSocket, disconnectSocket, socket } from '@/lib/socket';
import { useAuthStore } from '@/store/auth';

export default function HomeScreen() {
  const { user, removeUser } = useAuthStore((state) => state);

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

  return (
    <View className="flex-1 items-center justify-center gap-6 p-4">
      <View className="items-center gap-2">
        <Text variant="h1">Hello, {user?.username}!</Text>
        <Text className="text-muted-foreground text-sm">ID: {user?.id}</Text>
      </View>

      <Button variant="destructive" onPress={removeUser}>
        <Text>Logout</Text>
      </Button>
    </View>
  );
}
