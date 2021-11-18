import * as express from 'express';
import { initializeSequelize } from './models';
import { router, path } from './routes/routes';

export const app = express();

initializeSequelize();

app.use(path, router);
