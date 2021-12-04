import { IsString, IsBooleanString, IsNumberString } from 'class-validator';

export class CreateCommentDto {
  @IsNumberString()
  readonly articleId: string;

  @IsString()
  readonly content: string;

  @IsBooleanString()
  readonly anonymity: string;
}
