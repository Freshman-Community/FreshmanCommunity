import { Router } from 'express';
import { Users } from '../models/users.model';
import * as passport from 'passport';

import * as userRouter from './users.routes';
import * as articleRouter from './articles.routes';

export const router = Router();
export const path = '';

router.use(userRouter.path, userRouter.router);
router.use(articleRouter.path, articleRouter.router);

router.get('/api', (req, res, next) => {
  res.send('Hello World!');
});
