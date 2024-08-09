import { Schema, Prop,SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ContentetDocument = Contentet & Document;

@Schema({ timestamps: true })
export class Contentet {
  @Prop({ required: true })
  document: string;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  createdBy: User;
}

export const ContentetSchema = SchemaFactory.createForClass(Contentet)