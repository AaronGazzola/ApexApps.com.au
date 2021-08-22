import { IsEmail } from 'class-validator';

export class SendVerifyUserDto {
  @IsEmail()
  email: string;
}
