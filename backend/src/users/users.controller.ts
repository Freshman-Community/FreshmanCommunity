import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Logger,
  Req,
  Res,
  ParseIntPipe,
  Session,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SessionGuard } from './guards/session.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private readonly logger = new Logger(UsersController.name);

  @Get('exist/:username')
  async checkExists(@Param('username') username: string) {
    return await this.usersService.checkExists(username);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Req() req: any, @Res() res: any, @Session() session: any) {
    session.uid = req.user.id;
    this.logger.log(`${req.user.username} just logged in.`);
    res.status(200).end();
  }

  @Get('logout')
  @UseGuards(SessionGuard)
  logout(@Session() session: any) {
    session.destroy();
  }

  @Get('me')
  @UseGuards(SessionGuard)
  async findMe(@Session() session) {
    const user = await this.usersService.findOne(session.uid);
    user.password = null;
    return user;
  }

  @Post()
  async create(@Session() session, @Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    if (!user) return null;
    else session.uid = user.id;
    return user;
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
