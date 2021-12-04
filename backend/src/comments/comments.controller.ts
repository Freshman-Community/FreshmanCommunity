import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Session,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { SessionGuard } from 'src/users/guards/session.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(SessionGuard)
  create(@Body() createCommentDto: CreateCommentDto, @Session() session) {
    return this.commentsService.create(createCommentDto, session.uid);
  }

  @Get()
  async findAll(@Query('limit', ParseIntPipe) limit: number) {
    return await this.commentsService.findAll(limit);
  }

  @Get(':id')
  findOne(@Param('id') articleId: string) {
    return this.commentsService.findOne(+articleId);
  }

  @Delete(':id')
  @UseGuards(SessionGuard)
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
