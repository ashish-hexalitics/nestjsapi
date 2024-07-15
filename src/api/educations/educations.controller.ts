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
import { UserEducationDto } from '../../dto/education/user.education.dto';
import { EducationsService } from './educations.service';

@Controller('educations')
export class EducationsController {
  constructor(private educationsService: EducationsService) {}

  @Get('/:userId')
  async getAllUserEducations(
    @Param('userId') userId: string,
    @Res() res: Response,
  ) {
    const educations =
      await this.educationsService.getAllUserEducations(userId);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'User educations fetched successfully', educations });
  }

  @Post()
  async createUserEducation(
    @Body() userEducationDto: UserEducationDto,
    @Res() res: Response,
  ) {
    const education =
      await this.educationsService.createUserEducation(userEducationDto);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'User education created successfully', education });
  }

  @Put('/:id')
  async updateUserEducation(
    @Param('id') id: string,
    @Body() userEducationDto: UserEducationDto,
    @Res() res: Response,
  ) {
    const education = await this.educationsService.updateUserEducation(
      id,
      userEducationDto,
    );
    return res
      .status(HttpStatus.OK)
      .json({ message: 'User education updated successfully', education });
  }

  @Delete('/:id')
  async deleteUserEducation(@Param('id') id: string, @Res() res: Response) {
    const education = await this.educationsService.deleteUserEducation(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'User education deleted successfully', education });
  }
}
