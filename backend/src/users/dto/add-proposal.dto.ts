import { IsString, IsBoolean, IsArray } from 'class-validator';

export class AddProposalDto {
  @IsString()
  title: string;

  @IsArray()
  sections: {
    title: string;
    content: string;
    buttonLabel: string;
    buttonLink: string;
  }[];

  @IsString()
  videoLink: string;

  @IsBoolean()
  currentClient: boolean;
}
