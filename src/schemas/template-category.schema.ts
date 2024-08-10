import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type TemplateCategoryDocument = TemplateCategory & Document;

@Schema({ timestamps: true })
export class TemplateCategory {
  @Prop({ required: true })
  name: string;
}

export const TemplateCategorySchema =
  SchemaFactory.createForClass(TemplateCategory);
