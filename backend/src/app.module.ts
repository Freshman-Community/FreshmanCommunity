import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { ProfessorsModule } from './professors/professors.module';
import { CommentsModule } from './comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Article } from './articles/entities/article.entity';
import { Professor } from './professors/entities/professor.entity';
import { Comment } from './comments/entities/comment.entity';
import { ArticleLikesModule } from './article-likes/article-likes.module';
import { ArticleLike } from './article-likes/entities/article-like.entity';
import { CommentLikesModule } from './comment-likes/comment-likes.module';
import { CommentLike } from './comment-likes/entities/comment-like.entity';
import { ProfessorLikesModule } from './professor-likes/professor-likes.module';
import { ProfessorLike } from './professor-likes/entities/professor-likes.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        User,
        Article,
        Professor,
        Comment,
        ArticleLike,
        CommentLike,
        ProfessorLike,
      ],
      synchronize: true,
    }),
    UsersModule,
    ArticlesModule,
    ProfessorsModule,
    CommentsModule,
    ArticleLikesModule,
    CommentLikesModule,
    ProfessorLikesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
