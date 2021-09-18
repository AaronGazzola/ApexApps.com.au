import { IsString, IsNumber } from 'class-validator';

export class EditEstimateDto {
  @IsString()
  startFrom: Date;

  @IsString()
  startTo: Date;

  @IsString()
  endFrom: Date;

  @IsString()
  endTo: Date;

  @IsNumber()
  costFrom: number;

  @IsNumber()
  costTo: number;

  @IsString()
  currency: string;
}
