import { Module } from '@nestjs/common';
import { TemplateCategoryService } from './template-category.service';
import { TemplateCategoryController } from './template-category.controller';
import {
  TemplateCategory,
  TemplateCategorySchema,
} from '../../schemas/template-category.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TemplateCategory.name, schema: TemplateCategorySchema },
    ]),
  ],
  providers: [TemplateCategoryService],
  controllers: [TemplateCategoryController],
  exports: [TemplateCategoryService],
})
export class TemplateCategoryModule {}
