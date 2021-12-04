import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique('comment-like-unique', ['userId', 'commentId'])
export class CommentLike {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.id, { cascade: false })
  userId: number;

  @ManyToOne((type) => Comment, (comment) => comment.id, { cascade: false })
  commentId: number;

  @CreateDateColumn()
  createdAt: Date;
}
