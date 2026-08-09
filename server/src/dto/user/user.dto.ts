import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  username: z.string().nonempty().max(30),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserDto = z.infer<typeof userSchema>;

export const mongooseUserToDtoSchema = z
  .object({
    _id: z.any().transform((val) => String(val)),
    username: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .transform((doc) =>
    userSchema.parse({
      id: doc._id,
      username: doc.username,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }),
  );
