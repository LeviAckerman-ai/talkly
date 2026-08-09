import type { ValidatedRequest } from 'express-zod-safe';
import { z } from 'zod';

import { userSchema } from './user.dto';

export const createUserSchema = userSchema.pick({
  username: true,
});

export type CreateUserDto = z.infer<typeof createUserSchema>;

export type CreateUserRequest = ValidatedRequest<{ body: typeof createUserSchema }>;
