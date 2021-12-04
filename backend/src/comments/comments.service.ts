import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentsRepository: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto, userId: number) {
    const comment = new Comment();
    comment.articleId = +createCommentDto.articleId;
    comment.writerId = userId;
    comment.anonymity = createCommentDto.anonymity === 'true' ? true : false;
    comment.content = createCommentDto.content;
    return await this.commentsRepository.save(comment);
  }

  async findAll(limit: number) {
    return await this.commentsRepository
      .createQueryBuilder('comment')
      .orderBy('comment."createdAt"', 'DESC')
      .limit(limit)
      .getManyAndCount();
  }

  async findOne(articleId: number) {
    return await this.commentsRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.writer', 'user')
      .where(`comment."writerId" = :articleId`, { articleId })
      .orderBy('comment."createdAt"')
      .getManyAndCount();
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }

  async likeUp(id: number) {
    const comment = await this.commentsRepository.findOne({ id });
    comment.likeCount += 1;
    await this.commentsRepository.save(comment);
  }

  async likeDown(id: number) {
    const comment = await this.commentsRepository.findOne({ id });
    comment.likeCount -= 1;
    await this.commentsRepository.save(comment);
  }
}
