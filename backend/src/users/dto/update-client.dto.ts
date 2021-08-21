import { IsString, MaxLength } from 'class-validator';

export class UpdateClientDto {
  @MaxLength(30, { message: 'Name is too long (30 characters max)' })
  clientName: string;

  @IsString()
  id: string;
}
