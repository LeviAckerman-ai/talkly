import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  username: z.string().max(30),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type User = z.infer<typeof userSchema>;
