import { View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useAuthStore } from '@/store/auth';

export default function HomeScreen() {
  const { user, removeUser } = useAuthStore((state) => state);

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
