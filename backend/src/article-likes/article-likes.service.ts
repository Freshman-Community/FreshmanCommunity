import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticlesService } from 'src/articles/articles.service';
import { Repository } from 'typeorm';
import { ArticleLike } from './entities/article-like.entity';

@Injectable()
export class ArticleLikesService {
  constructor(
    @InjectRepository(ArticleLike)
    private articleLikeRepository: Repository<ArticleLike>,
    private articlesService: ArticlesService,
  ) {}

  async create(userId: number, articleId: number) {
    try {
      const articleLike = new ArticleLike();
      articleLike.userId = userId;
      articleLike.articleId = articleId;
      await this.articleLikeRepository.save(articleLike);
      await this.articlesService.likeUp(articleId);
      return true;
    } catch (error) {
      return false;
    }
  }

  async findOne(userId: number, articleId: number) {
    return await this.articleLikeRepository.findOne({ articleId, userId });
  }

  async remove(userId: number, articleId: number) {
    await this.articleLikeRepository.delete({
      userId,
      articleId,
    });
    this.articlesService.likeDown(articleId);
    return true;
  }
}
