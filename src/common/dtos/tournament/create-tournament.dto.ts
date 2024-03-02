import { IsNumber, IsOptional, IsString } from 'class-validator';

export class createTournamentDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsNumber()
  season: number;

  @IsString()
  orgName: string;
}
