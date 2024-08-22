import {
  Controller,
  Get,
  Param,
  Res,
  Req,
  HttpStatus,
  Post,
  Body,
  Put
} from '@nestjs/common';
import { Response } from 'express';
import { ResumeService } from './resume.service';
import { IUser } from '../../interfaces/user.interface'; // Adjust the path as needed
import { CreateResumeDto,UpdateResumeDto } from '../../dto/resume/resume.dto';

@Controller('/api/resume')
export class ResumeController {
  constructor(private resumeService: ResumeService) {}

  @Get('/:userId')
  async generateResume(@Param('userId') userId: string, @Res() res: Response) {
    try {
      const resume = await this.resumeService.generateResume(userId);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Resume generated successfully', resume });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'internal server error', error });
    }
  }

  @Post('/create/template')
  async createResumeTemplate(
    @Body()
    resumeData: CreateResumeDto,
    @Req() req: Request & { user: IUser },
    @Res() res: Response,
  ) {
    try {
      const resume = await this.resumeService.createResumeTemplate(
        resumeData,
        req,
      );
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Resume saved successfully', resume });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'internal server error', error });
    }
  }

  @Get('/get/templates')
  async getResumeTemplates(
    @Req() req: Request & { user: IUser },
    @Res() res: Response,
  ) {
    try {
      const templates = await this.resumeService.getResumeTemplates(req);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Resume fetched successfully', templates });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'internal server error', error });
    }
  }

  @Get('/get/template/:templateId')
  async getResumeTemplate(
    @Param('templateId') templateId: string,
    @Res() res: Response,
  ) {
    try {
      const template = await this.resumeService.getResumeTemplate(templateId);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Resume fetched successfully', template });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'internal server error', error });
    }
  }
  @Put('/update/template/:templateId')
  async updateTemplate(
    @Param('templateId') templateId: string,
    @Res() res: Response,
    @Body()
    resumeData: UpdateResumeDto,
  ) {
    try {
      const template = await this.resumeService.updateTemplate(templateId,resumeData);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Resume Updated successfully', template });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'internal server error', error });
    }
  }
}
