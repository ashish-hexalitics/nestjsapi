import { IsString, IsNotEmpty, IsDate, IsOptional } from 'class-validator';

export class UserEducationDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  institution: string;

  @IsString()
  @IsNotEmpty()
  degree: string;

  @IsString()
  @IsNotEmpty()
  fieldOfStudy: string;

  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @IsDate()
  @IsNotEmpty()
  endDate: Date;

  @IsString()
  @IsOptional()
  grade?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
