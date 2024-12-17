import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document, Types } from 'mongoose';

export type UserInfoDocument = UserInfo & Document;

@Schema({ timestamps: true })
export class UserInfo {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ trim: true })
  firstName: string;

  @Prop({ trim: true })
  lastName: string;

  @Prop({ trim: true })
  name: string;

  @Prop({ trim: true })
  city: string;

  @Prop({ trim: true })
  state: string;

  @Prop({ trim: true })
  country: string;

  @Prop({ trim: true })
  zipCode: string;

  @Prop({ trim: true })
  address: string;

  @Prop({ trim: true })
  phone: string;

  @Prop({ trim: true })
  otherEmail: string;

  @Prop({ trim: true })
  website: string;

  @Prop({ trim: true })
  gender: string;

  @Prop({ trim: true })
  marriedStatus: boolean;

  @Prop({ trim: true })
  description: string;

  @Prop({ trim: true })
  summary: string;

  @Prop({ trim: true })
  title: string;

  @Prop({ trim: true })
  hobbies: string;

  @Prop({ trim: true })
  languagesKnown: string;
}

export const UserInfoSchema = SchemaFactory.createForClass(UserInfo);


UserInfoSchema.pre<UserInfoDocument>('save', function (next) {
  // Combine firstName and lastName into name
  if (this.firstName || this.lastName) {
    this.name = `${this.firstName || ''} ${this.lastName || ''}`.trim();
  }

  // Combine city, state, and country into address
  if (this.city || this.state || this.country) {
    const addressParts = [this.city, this.state, this.country].filter(Boolean);
    this.address = addressParts.join(', ').trim();
  }

  next();
});


UserInfoSchema.index({ userId: 1 });
