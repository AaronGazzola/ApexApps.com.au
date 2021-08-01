import { IsString, MaxLength, MinLength, IsEmail } from 'class-validator';

export class SignupUserDto {
  @IsString()
  @MinLength(2, { message: 'Name is too short (2 characters min)' })
  @MaxLength(20, { message: 'Name is too long (20 characters max)' })
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password is too short (6 characters min)' })
  @MaxLength(20, { message: 'Password is too long (20 characters max)' })
  password: string;
}
