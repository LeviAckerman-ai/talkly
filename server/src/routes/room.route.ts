import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { type Router } from 'express';
import validate from 'express-zod-safe';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

import { roomController } from '@/controllers/room.controller';
import { createPaginatedResponseSchema, paginationQuerySchema } from '@/dto/common/pagination.dto';
import { createRoomSchema } from '@/dto/room/create-room.dto';
import { roomSchema } from '@/dto/room/room.dto';
import { requestBody } from '@/utils/openapi/request-builder';
import { createApiResponse } from '@/utils/openapi/response-builder';

export const roomRegistry = new OpenAPIRegistry();
export const roomRouter: Router = express.Router();

roomRegistry.registerPath({
  method: 'post',
  path: '/room',
  tags: ['Room'],
  summary: 'Create Room',
  description: 'Creates a new room',
  request: {
    body: requestBody(createRoomSchema),
  },
  responses: createApiResponse(roomSchema, 'Room created', StatusCodes.CREATED),
});

roomRouter.post('/', validate({ body: createRoomSchema }), roomController.create);

const roomIdParamsSchema = z.object({ id: z.string() });

roomRegistry.registerPath({
  method: 'get',
  path: '/room/{id}',
  tags: ['Room'],
  summary: 'Get room by ID',
  description: 'Fetches a room by their unique MongoDB identifier.',
  request: {
    params: roomIdParamsSchema,
  },
  responses: createApiResponse(roomSchema, 'Room found', StatusCodes.OK),
});

roomRouter.get('/:id', validate({ params: roomIdParamsSchema }), roomController.getById);

roomRegistry.registerPath({
  method: 'get',
  path: '/room',
  tags: ['Room'],
  summary: 'Get paginated rooms',
  description: 'Fetches a paginated list of rooms with optional search.',
  request: {
    query: paginationQuerySchema,
  },
  responses: createApiResponse(
    createPaginatedResponseSchema(roomSchema),
    'Rooms fetched',
    StatusCodes.OK,
  ),
});

roomRouter.get('/', validate({ query: paginationQuerySchema }), roomController.getAll);
