import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';

enum Size {
  A3 = 'a3',
  A4 = 'A4',
  Letter = 'Letter',
  Legal = 'Legal',
  Tabloid = 'Tabloid',
  A5 = 'A5',
  Custom = 'Custom',
}

enum Orientation {
  portrait = "portrait",
  landscape = "landscape",
}

export type ContentetDocument = Contentet & Document;

@Schema({ timestamps: true })
export class Contentet {
  @Prop({ required: true })
  document: string;
  @Prop({ default: '<div></div>' })
  templateName: string;
  @Prop({})
  category: string;
  @Prop({ default: 'portrait', enum: Orientation })
  orientation: string;
  @Prop({ default: 'A4', enum: Size })
  size: string;
  @Prop({ default: [] })
  layer: MongooseSchema.Types.Mixed;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  createdBy: User;
}

export const ContentetSchema = SchemaFactory.createForClass(Contentet);
