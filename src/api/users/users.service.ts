import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { UpdateUserDto, UserInfoDto } from '../../dto/users/user.dto';
import { UserInfo, UserInfoDocument } from '../../schemas/user.info.schema';
import {
  UserEmployment,
  UserEmploymentDocument,
} from '../../schemas/user.employment.schema';
import {
  UserEducation,
  UserEducationDocument,
} from '../../schemas/user.education.schema';
import { Skill, SkillDocument } from '../../schemas/skill.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(UserInfo.name) private userInfoModel: Model<UserInfoDocument>,
    @InjectModel(UserEmployment.name)
    private userEmploymentDocument: Model<UserEmploymentDocument>,
    @InjectModel(UserEducation.name)
    private userEducationDocument: Model<UserEducationDocument>,
    @InjectModel(Skill.name) private skillDocument: Model<SkillDocument>,
  ) {}

  async create(user: any): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userModel
      .findOne({ email })
      .populate('role')
      .exec();
    return user ?? undefined;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().populate('role').exec();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findUserInfo(id: string): Promise<UserInfo | null> {
    return this.userInfoModel.findOne({ userId: id }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async updateUserInfo(
    userId: string,
    updateUserInfoDto: UserInfoDto,
  ): Promise<UserInfo> {
    try {
      // Find the user info by userId
      let userInfo: UserInfo | null = await this.userInfoModel.findOne({
        userId,
      });

      if (!userInfo) {
        userInfo = await this.userInfoModel.create({
          userId,
          ...updateUserInfoDto,
        });
      } else {
        userInfo = await this.userInfoModel
          .findOneAndUpdate(
            { userId: userInfo.userId },
            { $set: updateUserInfoDto },
            { new: true },
          )
          .exec();
      }

      return userInfo as UserInfo;
    } catch (error) {
      throw new Error(`Failed to update user info: ${error.message}`);
    }
  }

  async findUserResumeData(id: string): Promise<any> {
    try {
      const user = await this.userModel.findOne({ _id: id }).exec();
      const userInfo = await this.userInfoModel.findOne({ userId: id }).exec();
      const employments = await this.userEmploymentDocument
        .find({ userId: id })
        .exec();
      const educations = await this.userEducationDocument
        .find({ userId: id })
        .exec();
      const skills = await this.skillDocument.find({ userId: id }).exec();
      return {
        user,
        userInfo,
        employments,
        educations,
        skills,
      };
    } catch (error) {
      throw new Error(`Failed to fetched user info: ${error.message}`);
    }
  }
}
