import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.username = createUserDto.username;
    user.password = await this.hashPassword(createUserDto.password);
    user.nickname = createUserDto.nickname;
    user.major = createUserDto.major;
    user.enteredYear = createUserDto.enteredYear;

    await this.userRepository.save(user);

    user.password = null;
    return user;
  }

  async findAll() {
    return await this.userRepository
      .createQueryBuilder('user')
      .limit(10)
      .orderBy('user.likeCount');
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ id });
  }

  async checkExists(username: string) {
    return !(await this.userRepository.findOne({ username }));
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      user.password = null;
      return user;
    } else return null;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  /**
   * ANCHOR: private methods
   */

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return hashedPassword;
  }
}
