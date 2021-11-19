import * as express from 'express';
import { initializeSequelize } from './models';
import { router, path } from './routes/routes';

export const app = express();

initializeSequelize();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(path, router);
