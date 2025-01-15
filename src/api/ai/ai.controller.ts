import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Param,
  Res,
} from '@nestjs/common';
import { AiService } from './ai.service';
import { Request, Response } from 'express';
import { AIDto } from 'src/dto/ai/ai.dto';

@Controller('/api/ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('/:tag')
  async generateData(
    @Param('tag') tag: string,
    @Body(new ValidationPipe()) aiDto: AIDto,
  ) {
    const res = await this.aiService.generateAIContent(aiDto.promt,tag);
    return res;
  }
}
