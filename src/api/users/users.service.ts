import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { UpdateUserDto } from '../../dto/users/update.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: any): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email }).exec();
    return user ?? undefined;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
