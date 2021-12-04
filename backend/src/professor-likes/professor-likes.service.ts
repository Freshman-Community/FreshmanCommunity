import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfessorLike } from './entities/professor-likes.entity';

@Injectable()
export class ProfessorLikesService {
  constructor(
    @InjectRepository(ProfessorLike)
    private professorLikeRepository: Repository<ProfessorLike>,
  ) {}

  async create(userId: number, professorId: number) {
    try {
      const professorLike = new ProfessorLike();
      professorLike.userId = userId;
      professorLike.professorId = professorId;
      await this.professorLikeRepository.save(professorLike);
      return true;
    } catch (error) {
      return false;
    }
  }

  async remove(userId: number, professorId: number) {
    await this.professorLikeRepository.delete({ userId, professorId });
    return true;
  }

  async findOne(professorId: number) {
    return await this.professorLikeRepository.count({ professorId });
  }
}
