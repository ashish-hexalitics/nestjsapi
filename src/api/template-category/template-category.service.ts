import { Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  TemplateCategory,
  TemplateCategoryDocument,
} from '../../schemas/template-category.schema';
import { CreateCategoryDto } from '../../dto/category/category.sto';

@Injectable()
export class TemplateCategoryService {
  constructor(
    @InjectModel(TemplateCategory.name)
    private templateCategorymodel: Model<TemplateCategoryDocument>,
  ) {}

  async getAllTemplateCategories(): Promise<TemplateCategory[] | Error> {
    try {
      return this.templateCategorymodel.find().exec();
    } catch (error) {
      return error;
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
