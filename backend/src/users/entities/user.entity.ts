import { Article } from 'src/articles/entities/article.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  nickname: string;

  @Column()
  major: string;

  @Column()
  enteredYear: number;

  @OneToMany((type) => Article, (article) => article.author, {
    cascade: false,
  })
  articles: Article[];
}
