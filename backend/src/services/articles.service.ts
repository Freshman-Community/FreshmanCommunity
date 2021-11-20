import sequelize = require('sequelize');
import { Articles, Category } from '../models/articles.model';
import { Users } from '../models/users.model';

export async function getArticles(
  communityType: Category,
  offset: number,
  limit: number,
): Promise<Articles[]> {
  const articles = await Articles.findAll({
    where: {
      communityType,
    },
    include: [
      {
        model: Users,
        required: false,
      },
    ],
    order: sequelize.col('createdAt'),
    offset,
    limit,
    subQuery: false,
  });
  return articles;
}

export async function getNumberOfArticles(communityType: Category) {
  const numberOfArticles: number = await Articles.count({
    where: { communityType },
  });

  return numberOfArticles;
}

export async function postArticle(
  authorId: number,
  communityType: Category,
  title: string,
  content: string,
  anonymity: boolean,
): Promise<boolean> {
  const { id: articleId } = await Articles.create({
    authorId,
    communityType,
    title,
    content,
    anonymity,
  });

  return !!articleId;
}
