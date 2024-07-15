import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { UserEmploymentDto } from '../../dto/employment/user.employment.dto';
import { EmploymentsService } from './employments.service';

@Controller('/api/employments')
export class EmploymentsController {
  constructor(private employmentsService: EmploymentsService) {}

  @Get('/:userId')
  async getAllUserEmployments(
    @Param('userId') userId: string,
    @Res() res: Response,
  ) {
    const employments =
      await this.employmentsService.getAllUserEmployments(userId);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'User employments fetched successfully', employments });
  }

  @Post()
  async createUserEmployment(
    @Body() userEmploymentDto: UserEmploymentDto,
    @Res() res: Response,
  ) {
    const employment =
      await this.employmentsService.createUserEmployment(userEmploymentDto);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'User employment created successfully', employment });
  }

  @Put('/:id')
  async updateUserEmployment(
    @Param('id') id: string,
    @Body() userEmploymentDto: UserEmploymentDto,
    @Res() res: Response,
  ) {
    const employment = await this.employmentsService.updateUserEmployment(
      id,
      userEmploymentDto,
    );
    return res
      .status(HttpStatus.OK)
      .json({ message: 'User employment updated successfully', employment });
  }

  @Delete('/:id')
  async deleteUserEmployment(@Param('id') id: string, @Res() res: Response) {
    const employment = await this.employmentsService.deleteUserEmployment(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'User employment deleted successfully', employment });
  }
}
