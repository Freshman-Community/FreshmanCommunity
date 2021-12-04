import { Test, TestingModule } from '@nestjs/testing';
import { ProfessorLikesController } from './professor-likes.controller';
import { ProfessorLikesService } from './professor-likes.service';

describe('ProfessorLikesController', () => {
  let controller: ProfessorLikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfessorLikesController],
      providers: [ProfessorLikesService],
    }).compile();

    controller = module.get<ProfessorLikesController>(ProfessorLikesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
