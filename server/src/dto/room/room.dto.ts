import { z } from 'zod';

export const roomSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type RoomDto = z.infer<typeof roomSchema>;

export const mongooseRoomToDtoSchema = z
  .object({
    _id: z.any().transform((val) => String(val)),
    name: z.string().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .transform((doc) =>
    roomSchema.parse({
      id: doc._id,
      name: doc.name,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }),
  );
