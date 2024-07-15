import { IsString, IsNotEmpty, IsDate, IsOptional } from 'class-validator';

export class UserEmploymentDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @IsDate()
  @IsNotEmpty()
  endDate: Date;

  @IsString()
  @IsOptional()
  description?: string;
}
