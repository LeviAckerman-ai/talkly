import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import errorHandler from '@/middlewares/error-handler.middleware';
import helmet from '@/middlewares/helmet.middleware';
import rateLimiter from '@/middlewares/rate-limiter.middleware';
import requestLogger from '@/middlewares/request-logger.middleware';
import { env } from './env';
import { healthCheckRouter } from './routes/health-check.route';
import { messageRouter } from './routes/message.route';
import { roomRouter } from './routes/room.route';
import { userRouter } from './routes/user.route';
import { openAPIRouter } from './utils/openapi/router';

const app: express.Express = express();

// Set the application to trust the reverse proxy
app.set('trust proxy', true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet);
app.use(rateLimiter);

// Request logging
app.use(requestLogger);

app.use('/health-check', healthCheckRouter);
app.use('/user', userRouter);
app.use('/room', roomRouter);
app.use('/message', messageRouter);

app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export default app;
