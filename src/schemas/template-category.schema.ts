import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type TemplateCategoryDocument = TemplateCategory & Document;

@Schema({ timestamps: true })
export class TemplateCategory {
  @Prop({ required: true })
  name: string;
  @Prop({ default: [] })
  defaultSample: MongooseSchema.Types.Mixed;
}

export const TemplateCategorySchema =
  SchemaFactory.createForClass(TemplateCategory);
