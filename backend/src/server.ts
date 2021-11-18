import { logger } from './modules/logger';
import { app } from './app';
import { env } from './modules/env';

export const server = app;

server.listen(3000);
logger.info(`App listening at http://${env.host}:${env.port}`);
