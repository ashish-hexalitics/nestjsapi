import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersSchemaService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: any): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email }).exec();
    return user ?? undefined;
  }
}
