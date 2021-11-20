import { Router } from 'express';
import sequelize = require('sequelize');
import { Articles } from '../models/articles.model';

import * as articlesController from '../controllers/articles.controller';
import { sessionGuard } from '../modules/session.guard';

export const path = '/api/article';
export const router = Router();

router.get('/general', articlesController.getGeneralArticles);
router.post('/general', sessionGuard, articlesController.postGeneralArticle);
