import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { SessionGuard } from 'src/users/guards/session.guard';
import { ProfessorLikesService } from './professor-likes.service';

@Controller('professor-likes')
export class ProfessorLikesController {
  constructor(private readonly professorLikesService: ProfessorLikesService) {}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.professorLikesService.findOne(id);
  }

  @Post(':id')
  @UseGuards(SessionGuard)
  async thumbUpDown(@Param('id', ParseIntPipe) id: number, @Session() session) {
    const uid = +session.uid;
    if ((await this.professorLikesService.create(uid, id)) === false)
      await this.professorLikesService.remove(uid, id);
    return true;
  }
}
