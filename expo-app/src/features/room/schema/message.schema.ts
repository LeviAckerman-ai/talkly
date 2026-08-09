import { z } from 'zod';

import { createPaginatedResponseSchema } from '@/features/home/schema/pagination.schema';

export const messageUserSchema = z.object({
  _id: z.string(),
  username: z.string(),
  avatar: z.string().optional().nullable(),
});

export const messageSchema = z.object({
  _id: z.string(),
  content: z.string(),
  createdAt: z.string().or(z.date()),
  sender: messageUserSchema,
  room: z.string(),
});

export const paginatedMessagesSchema = createPaginatedResponseSchema(messageSchema);

export type MessageDto = z.infer<typeof messageSchema>;
