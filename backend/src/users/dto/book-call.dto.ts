import { IsEmail, IsString } from 'class-validator';

export class BookCallDto {
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
  contactMethod: string;
  @IsString()
  phone: string;
  @IsString()
  zoomName: string;
  @IsString()
  callTime: string;
  @IsString()
  userCallTime: string;
}
