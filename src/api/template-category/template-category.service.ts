import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  TemplateCategory,
  TemplateCategoryDocument,
} from '../../schemas/template-category.schema';
import { CategoryDto } from '../../dto/category/category.dto';

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
    categoryDto: CategoryDto,
  ): Promise<TemplateCategory | Error> {
    try {
      const category = await this.templateCategorymodel.create(categoryDto);
      return category;
    } catch (error) {
      return error;
    }
  }
  async updateTemplateCategoy(
    id: string,
    categoryDto: CategoryDto,
  ): Promise<TemplateCategory | Error> {
    try {
      const category = await this.templateCategorymodel.findOneAndUpdate(
        { _id: id },
        categoryDto,
        { new: true },
      );
      return category as TemplateCategory;
    } catch (error) {
      return error;
    }
  }

  async cloneTemplateCategory(categoryId: string) {
    try {
      const category = await this.getTemplateCategoryById(categoryId);
      if (!category) throw new NotFoundException('Category not found');
      const similarCategories = await this.findCategoriesByNamePattern(
        `${category.name}-copy`,
      );
      const newCategoryName = this.generateUniqueCopyName(
        category.name,
        similarCategories,
      );

      const clonedCategoryData = { name: newCategoryName };
      return this.createTemplateCategories(clonedCategoryData);
    } catch (error) {
      return error;
    }
  }

  async deleteTemplateCategory(categoryId: string) {
    const category = await this.getTemplateCategoryById(categoryId);
    if (!category) throw new NotFoundException('Category not found');
    const deletedCategory = this.templateCategorymodel
      .findOneAndDelete({ _id: categoryId })
      .exec();
    return deletedCategory;
  }

  private async getTemplateCategoryById(categoryId: string) {
    const category = this.templateCategorymodel
      .findOne({ _id: categoryId })
      .exec();
    return category;
  }

  private generateUniqueCopyName(
    baseName: string,
    similarCategories: TemplateCategory[],
  ): string {
    let maxCopyNumber = 0;

    similarCategories.forEach((cat) => {
      const match = cat.name.match(new RegExp(`${baseName}-copy(\\d+)$`));
      if (match) {
        const copyNumber = parseInt(match[1], 10);
        if (copyNumber > maxCopyNumber) {
          maxCopyNumber = copyNumber;
        }
      }
    });

    const newCopyNumber = (maxCopyNumber + 1).toString().padStart(2, '0');
    return `${baseName}-copy${newCopyNumber}`;
  }

  async findCategoriesByNamePattern(
    baseName: string,
  ): Promise<TemplateCategory[]> {
    const regexPattern = new RegExp(`^${baseName}-copy\\d+$`);
    return this.templateCategorymodel.find({ name: regexPattern }).exec();
  }
}
