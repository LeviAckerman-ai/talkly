import { Redirect, Stack } from 'expo-router';

import { useAuthStore } from '@/store/auth';

export default function MainRootLayout() {
  const { user } = useAuthStore((state) => state);

  if (!user) return <Redirect href={'/(auth)/login'} />;

  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="room/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
