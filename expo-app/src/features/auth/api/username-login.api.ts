import { env } from '@/env';
import { userSchema } from '@/features/user/user.schema';
import { typedFetch } from '@/lib/fetch';
import { UsernameLoginParam } from '../schema/username-login.schema';

export const usernameLoginApi = async (data: UsernameLoginParam) => {
  return await typedFetch({
    url: `${env.EXPO_PUBLIC_SERVER_URL}/user/auth`,
    method: 'POST',
    body: data,
    schema: userSchema,
  });
};
