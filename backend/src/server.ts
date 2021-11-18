import { logger } from './modules/logger';
import { app } from './app';

export const server = app;

server.listen(3000);
logger.info('App listening on the port 3000');
