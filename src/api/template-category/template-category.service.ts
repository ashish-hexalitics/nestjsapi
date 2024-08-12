import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  TemplateCategory,
  TemplateCategoryDocument,
} from '../../schemas/template-category.schema';
import { CreateCategoryDto } from '../../dto/category/category.dto';

@Injectable()
export class TemplateCategoryService {
  constructor(
    @InjectModel(TemplateCategory.name)
    private templateCategorymodel: Model<TemplateCategoryDocument>,
  ) {}

  async getAllTemplateCategories(): Promise<TemplateCategory[] | Error> {
    try {
      const categories = this.templateCategorymodel.find().exec();
      return categories;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch template categories',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createTemplateCategories(
    categoryDto: CreateCategoryDto,
  ): Promise<TemplateCategory | Error> {
    try {
      const category = await this.templateCategorymodel.create(categoryDto);
      return category;
    } catch (error) {
      return error;
    }
  }
}
