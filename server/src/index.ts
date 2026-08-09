import app from './app';
import connectDatabase from './config/mongoose.config';
import { env } from './env';
import { logger } from './utils/logger';

const startServer = async () => {
  await connectDatabase();

  const server = app.listen(env.PORT, () => {
    const { NODE_ENV, HOST, PORT } = env;
    logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
  });

  const onCloseSignal = () => {
    logger.info('sigint received, shutting down');
    server.close(() => {
      logger.info('server closed');
      process.exit();
    });
    setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
  };

  process.on('SIGINT', onCloseSignal);
  process.on('SIGTERM', onCloseSignal);
};

startServer();
