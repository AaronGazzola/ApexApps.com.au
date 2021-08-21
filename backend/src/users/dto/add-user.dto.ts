import {
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class AddUserDto {
  @IsString()
  @MaxLength(30, { message: 'Name is too long (30 characters max)' })
  name: string;
}
