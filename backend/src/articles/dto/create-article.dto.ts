import { IsString, IsBooleanString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsBooleanString()
  readonly anonymity: boolean;
}
