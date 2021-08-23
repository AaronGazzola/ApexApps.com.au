import { IsString, MaxLength } from 'class-validator';

export class AddProjectDto {
  @IsString()
  @MaxLength(30, { message: 'Title is too long (30 characters max)' })
  title: string;

  @IsString()
  clientId: string;
}
