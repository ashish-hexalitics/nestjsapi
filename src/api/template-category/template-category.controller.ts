import {
  Controller,
  Req,
  Res,
  Post,
  Put,
  Get,
  Delete,
  Body,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { TemplateCategoryService } from './template-category.service';
import { CategoryDto } from '../../dto/category/category.dto';
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
    @Res() res: Response,
    @Body() categoryDto: CategoryDto,
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

  @Put('/:categoryId')
  async updateTemplateCategories(
    @Res() res: Response,
    @Body() categoryDto: CategoryDto,
    @Param('categoryId') categoryId: string,
  ) {
    try {
      const category = await this.templateCategoryService.updateTemplateCategoy(
        categoryId,
        categoryDto,
      );
      return res
        .status(HttpStatus.OK)
        .json({ message: 'category updated', category });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'internal server error', error });
    }
  }

  @Post('/clone/:categoryId')
  async cloneTemplateCategory(
    @Res() res: Response,
    @Param('categoryId') categoryId: string,
  ) {
    try {
      const clonedCategory =
        await this.templateCategoryService.cloneTemplateCategory(categoryId);
      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'category cloned', category: clonedCategory });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'internal server error', error });
    }
  }

  @Delete('/:categoryId')
  async deleteTemplateCategory(
    @Res() res: Response,
    @Param('categoryId') categoryId: string,
  ) {
    try {
      await this.templateCategoryService.deleteTemplateCategory(categoryId);
      return res.status(HttpStatus.OK).json({ message: 'category deleted' });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'internal server error', error });
    }
  }
}
