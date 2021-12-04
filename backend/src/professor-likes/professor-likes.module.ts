import { Module } from '@nestjs/common';
import { ProfessorLikesService } from './professor-likes.service';
import { ProfessorLikesController } from './professor-likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorLike } from './entities/professor-likes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfessorLike])],
  controllers: [ProfessorLikesController],
  providers: [ProfessorLikesService],
})
export class ProfessorLikesModule {}
