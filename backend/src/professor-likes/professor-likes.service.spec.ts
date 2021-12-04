import { Test, TestingModule } from '@nestjs/testing';
import { ProfessorLikesService } from './professor-likes.service';

describe('ProfessorLikesService', () => {
  let service: ProfessorLikesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfessorLikesService],
    }).compile();

    service = module.get<ProfessorLikesService>(ProfessorLikesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
