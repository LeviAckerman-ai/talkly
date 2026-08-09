import { Redirect, Stack } from 'expo-router';

import { useAuthStore } from '@/store/auth';

export default function AuthRootLayout() {
  const { user } = useAuthStore((state) => state);

  if (user) return <Redirect href={'/(main)'} />;

  return (
    <Stack initialRouteName="login">
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
}
