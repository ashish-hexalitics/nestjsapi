import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class AIDto {
  @IsString()
  promt: string;
}