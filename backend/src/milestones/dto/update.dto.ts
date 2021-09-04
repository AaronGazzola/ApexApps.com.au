import { IsString, IsBoolean } from 'class-validator';

export class UpdateDto {
  @IsString()
  id: string;

  @IsString()
  date: Date;

  @IsString()
  notes: string;

  @IsString()
  buttonLink: string;

  @IsString()
  buttonLabel: string;

  @IsBoolean()
  publish: boolean;
}
