import { IsString, MaxLength, MinLength, IsOptional } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  token: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Password is too short (6 characters min)' })
  @MaxLength(20, { message: 'Password is too long (20 characters max)' })
  password?: string;
}
