import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  Session,
  ParseIntPipe,
} from '@nestjs/common';
import { SessionGuard } from 'src/users/guards/session.guard';
import { ArticleLikesService } from './article-likes.service';

@Controller('article-likes')
export class ArticleLikesController {
  constructor(private readonly articleLikesService: ArticleLikesService) {}

  @Get(':id')
  @UseGuards(SessionGuard)
  async findOne(@Param('id', ParseIntPipe) id: number, @Session() session) {
    const uid = session.uid;
    const like = await this.articleLikesService.findOne(+uid, id);
    if (like) this.articleLikesService.remove(+uid, id);
    else this.articleLikesService.create(+uid, id);
    return true;
  }
}
