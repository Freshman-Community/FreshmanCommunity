import * as articlesService from '../services/articles.service';
import { Response } from 'express';

export async function getGeneralArticles(req, res) {
  const { offset, limit } = req.query;
  const articles = await articlesService.getArticles('general', offset, limit);
  const numberOfArticles = await articlesService.getNumberOfArticles('general');

  if (articles) {
    res.status(200).send({ articles, numberOfArticles });
  } else {
    res.status(404).send('Not found');
  }
}

export async function postGeneralArticle(req, res: Response) {
  const { title, content, anonymityRadio } = req.body;

  const anonymity: boolean = !!anonymityRadio;
  const success = await articlesService.postArticle(
    req.user.id,
    'general',
    title,
    content,
    anonymity,
  );

  if (success) {
    res.status(201).redirect('/community.html');
  } else {
    res.status(500).send('Internal error');
  }
}
