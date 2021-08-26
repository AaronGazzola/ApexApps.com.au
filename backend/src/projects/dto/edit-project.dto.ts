import { IsString, MaxLength } from 'class-validator';

export class EditProjectDto {
  @IsString()
  @MaxLength(30, { message: 'Title is too long (30 characters max)' })
  title: string;

  @IsString()
  @MaxLength(500, { message: 'Description is too long (500 characters max)' })
  description: string;
}
