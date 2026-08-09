import type { Request } from 'express';
import { z } from 'zod';

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
  search: z.string().optional(),
  cursor: z.string().optional(), // For cursor-based approaches
});

export type PaginationQueryDto = z.infer<typeof paginationQuerySchema>;

export interface PaginationRequest extends Request {
  query: PaginationQueryDto & Record<string, any>;
}

export const createPaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    docs: z.array(itemSchema),
    totalDocs: z.number(),
    limit: z.number(),
    page: z.number().optional(),
    totalPages: z.number(),
    hasNextPage: z.boolean(),
    hasPrevPage: z.boolean(),
    nextPage: z.number().nullable(),
    prevPage: z.number().nullable(),
    pagingCounter: z.number(),
  });
