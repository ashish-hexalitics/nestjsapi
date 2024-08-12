import {
  Controller,
  Req,
  Res,
  Post,
  Get,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { TemplateCategoryService } from './template-category.service';
import { CreateCategoryDto } from '../../dto/category/category.dto';
import { Request, Response } from 'express';

@Controller('/api/template-category')
export class TemplateCategoryController {
  constructor(private templateCategoryService: TemplateCategoryService) {}
  @Get()
  async getAllTemplateCategories(@Res() res: Response) {
    try {
      const categories =
        await this.templateCategoryService.getAllTemplateCategories();
      return res
        .status(HttpStatus.OK)
        .json({ message: 'categories fetched', categories });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'internal server error', error });
    }
  }

  @Post()
  async createTemplateCategories(
    @Req() req: Request,
    @Res() res: Response,
    @Body() categoryDto: CreateCategoryDto,
  ) {
    try {
      const category =
        await this.templateCategoryService.createTemplateCategories(
          categoryDto,
        );
      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'category created', category });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'internal server error', error });
    }
  }
}
