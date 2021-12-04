import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentsService } from 'src/comments/comments.service';
import { Repository } from 'typeorm';
import { CommentLike } from './entities/comment-like.entity';

@Injectable()
export class CommentLikesService {
  constructor(
    @InjectRepository(CommentLike)
    private commentLikeRepository: Repository<CommentLike>,
    private commentsService: CommentsService,
  ) {}

  async create(userId: number, commentId: number) {
    try {
      const commentLike = new CommentLike();
      commentLike.userId = userId;
      commentLike.commentId = commentId;
      await this.commentLikeRepository.save(commentLike);
      await this.commentsService.likeUp(commentId);
      return true;
    } catch (error) {
      return false;
    }
  }

  async findOne(userId: number, commentId: number) {
    return await this.commentLikeRepository.findOne({ commentId, userId });
  }

  async remove(userId: number, commentId: number) {
    await this.commentLikeRepository.delete({
      userId,
      commentId,
    });
    this.commentsService.likeDown(commentId);
    return true;
  }
}
