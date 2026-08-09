import { z } from 'zod';

export const roomSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Room = z.infer<typeof roomSchema>;

export const createRoomSchema = z.object({
  name: z.string().max(50).optional(),
});

export type CreateRoomParam = z.infer<typeof createRoomSchema>;
