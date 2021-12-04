import { User } from 'src/users/entities/user.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  authorId: number;

  @ManyToOne((type) => User, (author) => author.articles, { cascade: false })
  author: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  anonymity: boolean;

  @Column({ default: 0 })
  likeCount: number;

  @Column({ default: 0 })
  viewCount: number;

  @OneToMany((type) => Comment, (comment) => comment.article, { cascade: true })
  comments: Comment[];
}
