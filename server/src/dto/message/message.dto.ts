import { z } from 'zod';

export const messageSchema = z.object({
  _id: z.string(),
  room: z.string(),
  sender: z.any(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type MessageDto = z.infer<typeof messageSchema>;
