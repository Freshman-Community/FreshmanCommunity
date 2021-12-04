import { Article } from 'src/articles/entities/article.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  writerId: number;

  @ManyToOne((type) => User, (user) => user.comments, { cascade: false })
  writer: User;

  @Column()
  articleId: number;

  @ManyToOne((type) => Article, (article) => article.comments, {
    cascade: false,
  })
  article: Article;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  content: string;

  @Column()
  anonymity: boolean;

  @Column({ default: 0 })
  likeCount: number;
}
