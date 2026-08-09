import { z } from 'zod';

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
  search: z.string().optional(),
  cursor: z.string().optional(),
});

export type PaginationQueryParam = z.infer<typeof paginationQuerySchema>;

export const createPaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    docs: z.array(itemSchema),
    totalDocs: z.number(),
    limit: z.number(),
    page: z.number().optional().nullable(),
    totalPages: z.number(),
    hasNextPage: z.boolean(),
    hasPrevPage: z.boolean(),
    nextPage: z.number().nullable(),
    prevPage: z.number().nullable(),
    pagingCounter: z.number(),
  });
