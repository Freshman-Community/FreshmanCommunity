import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Session,
  UseGuards,
} from '@nestjs/common';
import { SessionGuard } from 'src/users/guards/session.guard';
import { CommentLikesService } from './comment-likes.service';

@Controller('comment-likes')
export class CommentLikesController {
  constructor(private readonly commentLikesService: CommentLikesService) {}

  @Get(':id')
  @UseGuards(SessionGuard)
  async like(@Param('id', ParseIntPipe) id: number, @Session() session) {
    const uid = session.uid;
    const like = await this.commentLikesService.findOne(+uid, id);
    if (like) this.commentLikesService.remove(+uid, id);
    else this.commentLikesService.create(+uid, id);
    return true;
  }
}
