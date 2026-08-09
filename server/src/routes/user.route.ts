import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { type Router } from 'express';
import validate from 'express-zod-safe';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

import { userController } from '@/controllers/user.controller';
import { createPaginatedResponseSchema, paginationQuerySchema } from '@/dto/common/pagination.dto';
import { createUserSchema } from '@/dto/user/create-user.dto';
import { userSchema } from '@/dto/user/user.dto';
import { requestBody } from '@/utils/openapi/request-builder';
import { createApiResponse } from '@/utils/openapi/response-builder';

export const userRegistry = new OpenAPIRegistry();
export const userRouter: Router = express.Router();

userRegistry.registerPath({
  method: 'post',
  path: '/user/auth',
  tags: ['User'],
  summary: 'Login or Register',
  description: 'this is dummy login',
  request: {
    body: requestBody(createUserSchema),
  },
  responses: createApiResponse(userSchema, 'User logged in or created', StatusCodes.OK),
});

userRouter.post('/auth', validate({ body: createUserSchema }), userController.auth);

const userIdParamsSchema = z.object({ id: z.string() });

userRegistry.registerPath({
  method: 'get',
  path: '/user/{id}',
  tags: ['User'],
  summary: 'Get user by ID',
  description: 'Fetches a user profile by their unique MongoDB identifier.',
  request: {
    params: userIdParamsSchema,
  },
  responses: createApiResponse(userSchema, 'User found', StatusCodes.OK),
});

userRouter.get('/:id', validate({ params: userIdParamsSchema }), userController.getById);

userRegistry.registerPath({
  method: 'get',
  path: '/user',
  tags: ['User'],
  summary: 'Get paginated users',
  description: 'Fetches a paginated list of users with optional search.',
  request: {
    query: paginationQuerySchema,
  },
  responses: createApiResponse(
    createPaginatedResponseSchema(userSchema),
    'Users fetched',
    StatusCodes.OK,
  ),
});

userRouter.get('/', validate({ query: paginationQuerySchema }), userController.getAll);
