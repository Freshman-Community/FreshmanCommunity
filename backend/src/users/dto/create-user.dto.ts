import { IsString, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly nickname: string;

  @IsString()
  readonly major: string;

  @IsNumber()
  readonly enteredYear: number;
}
