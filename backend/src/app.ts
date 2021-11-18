import * as express from 'express';
import { router, path } from './routes/routes';

export const app = express();

app.use(path, router);
