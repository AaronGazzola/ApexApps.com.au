import { IsEmail, IsString } from 'class-validator';

export class SendEmailDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsEmail()
  contactEmail: string;
  @IsString()
  projectTitle: string;
  @IsString()
  projectDescription: string;
  @IsString()
  emailComments: string;
}
