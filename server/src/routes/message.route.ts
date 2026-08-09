import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { type Router } from 'express';
import validate from 'express-zod-safe';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

import { messageController } from '@/controllers/message.controller';
import { createPaginatedResponseSchema, paginationQuerySchema } from '@/dto/common/pagination.dto';
import { messageSchema } from '@/dto/message/message.dto';
import { createApiResponse } from '@/utils/openapi/response-builder';

export const messageRegistry = new OpenAPIRegistry();
export const messageRouter: Router = express.Router();

const roomIdParamsSchema = z.object({ roomId: z.string() });

messageRegistry.registerPath({
  method: 'get',
  path: '/message/room/{roomId}',
  tags: ['Message'],
  summary: 'Get paginated messages for a room',
  description: 'Fetches a paginated list of messages for a specific room.',
  request: {
    params: roomIdParamsSchema,
    query: paginationQuerySchema,
  },
  responses: createApiResponse(
    createPaginatedResponseSchema(messageSchema),
    'Messages fetched',
    StatusCodes.OK,
  ),
});

messageRouter.get(
  '/room/:roomId',
  validate({ params: roomIdParamsSchema, query: paginationQuerySchema }),
  messageController.getByRoomId,
);
