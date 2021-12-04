import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article) private articlesRepository: Repository<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto, userId: number) {
    const article = new Article();

    article.title = createArticleDto.title;
    article.content = createArticleDto.content;
    article.anonymity = createArticleDto.anonymity === 'true' ? true : false;
    article.authorId = userId;
    return await this.articlesRepository.save(article);
  }

  findAll(offset: number, limit: number): Promise<[Article[], number]> {
    return this.articlesRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.author', 'user')
      .offset(offset)
      .limit(limit)
      .getManyAndCount();
  }

  countAll() {
    return this.articlesRepository.count();
  }

  async findBest() {
    return await this.articlesRepository
      .createQueryBuilder('article')
      .orderBy('article."likeCount"', 'DESC')
      .limit(5)
      .getManyAndCount();
  }

  async findOne(id: number) {
    const article = await this.articlesRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.author', 'user')
      .where(`article."id" = :id`, { id })
      .getOne();

    article.viewCount += 1;
    await this.articlesRepository.save(article);
    return article;
  }

  async likeUp(id: number) {
    const article = await this.articlesRepository.findOne({ id });
    article.likeCount += 1;
    await this.articlesRepository.save(article);
  }

  async likeDown(id: number) {
    const article = await this.articlesRepository.findOne({ id });
    article.likeCount -= 1;
    await this.articlesRepository.save(article);
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
