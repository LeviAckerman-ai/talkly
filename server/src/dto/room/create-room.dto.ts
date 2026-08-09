import type { Request } from 'express';
import { z } from 'zod';

export const createRoomSchema = z.object({
  name: z.string().max(50).optional(),
});

export type CreateRoomDto = z.infer<typeof createRoomSchema>;

export interface CreateRoomRequest extends Request {
  body: CreateRoomDto;
}
