import {
  Controller,
  Get,
  Param,
  Res,
  Req,
  HttpStatus,
  Post,
  Body,
} from '@nestjs/common';
import { Response } from 'express';
import { ResumeService } from './resume.service';
import { IUser } from '../../interfaces/user.interface'; // Adjust the path as needed

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
    resumeData: { document: string; templateName: string; categoryId: string },
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

  @Get('/create/template')
  async getResumeTemplate(
    @Req() req: Request & { user: IUser },
    @Res() res: Response,
  ) {
    try {
      const templates = await this.resumeService.getResumeTemplate(req);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Resume fetched successfully', templates });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'internal server error', error });
    }
  }
}
