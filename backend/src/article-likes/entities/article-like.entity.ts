import { Article } from 'src/articles/entities/article.entity';
import { User } from 'src/users/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique('article-like-unique', ['userId', 'articleId'])
export class ArticleLike {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.id, { cascade: false })
  userId: number;

  @ManyToOne((type) => Article, (article) => article.id, { cascade: false })
  articleId: number;

  @CreateDateColumn()
  createdAt: Date;
}
