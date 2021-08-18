import {
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  email: string;

  @MaxLength(30, { message: 'Name is too long (30 characters max)' })
  userName: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Password is too short (6 characters min)' })
  @MaxLength(20, { message: 'Password is too long (20 characters max)' })
  newPassword?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Password is too short (6 characters min)' })
  @MaxLength(20, { message: 'Password is too long (20 characters max)' })
  currentPassword?: string;
}
