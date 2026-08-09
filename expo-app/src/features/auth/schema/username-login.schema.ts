import { z } from 'zod';

export const usernameLoginParmaSchema = z.object({
  username: z.string().nonempty().max(30),
});

export type UsernameLoginParam = z.infer<typeof usernameLoginParmaSchema>;
