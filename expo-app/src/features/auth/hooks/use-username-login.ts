import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';

import { useAuthStore } from '@/store/auth';
import { usernameLoginApi } from '../api/username-login.api';

export function useUsernameLogin() {
  const { setUser } = useAuthStore((state) => state);

  return useMutation({
    mutationFn: usernameLoginApi,
    onSuccess: (data) => {
      setUser(data);

      router.replace('/');
    },
    onError: (error) => {
      alert(error);
    },
  });
}
