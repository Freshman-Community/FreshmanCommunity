import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
  Session,
} from '@nestjs/common';
import { SessionGuard } from 'src/users/guards/session.guard';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @UseGuards(SessionGuard)
  async create(@Body() createArticleDto: CreateArticleDto, @Session() session) {
    return await this.articlesService.create(createArticleDto, session.uid);
  }

  @Get()
  async findAll(
    @Query('offset', ParseIntPipe) offset: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return await this.articlesService.findAll(offset, limit);
  }

  @Get('count')
  countAll() {
    return this.articlesService.countAll();
  }

  @Get('best')
  async findBest() {
    return await this.articlesService.findBest();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
