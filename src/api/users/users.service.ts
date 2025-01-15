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
import { UserSkill, UserSkillDocument } from '../../schemas/user.skill.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(UserInfo.name) private userInfoModel: Model<UserInfoDocument>,
    @InjectModel(UserEmployment.name)
    private userEmploymentDocument: Model<UserEmploymentDocument>,
    @InjectModel(UserEducation.name)
    private userEducationDocument: Model<UserEducationDocument>,
    @InjectModel(UserSkill.name)
    private userSkillDocument: Model<UserSkillDocument>,
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
      const skills = await this.userSkillDocument
        .find({ userId: id })
        .populate('skillId')
        .exec();
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

  async getUserCompletionStatus(id: string): Promise<any> {
    try {
      // Fetch user data from the database
      // const user = await this.userModel.findOne({ _id: id }).exec();
      const userInfo: any = await this.userInfoModel
        .findOne({ userId: id })
        .exec();
      const employments: any[] = await this.userEmploymentDocument
        .find({ userId: id })
        .exec();
      const educations: any[] = await this.userEducationDocument
        .find({ userId: id })
        .exec();
      const skills = await this.userSkillDocument
        .find({ userId: id })
        .populate('skillId')
        .exec();

      // Define steps and validation logic
      const steps = [
        { route: 'build-resume/contact', step: 1, field: 'userInfo' },
        { route: 'build-resume/experience', step: 2, field: 'employments' },
        { route: 'build-resume/education', step: 3, field: 'educations' },
        { route: 'build-resume/skills', step: 4, field: 'skills' },
        {
          route: 'build-resume/additional-details',
          step: 5,
          field: 'additionalDetails',
        },
      ];

      // Validation functions
      const isContactComplete = () =>
        userInfo &&
        [
          'firstName',
          'lastName',
          'city',
          'country',
          'zipCode',
          'phone',
          'otherEmail',
        ].every((field) => userInfo[field]);

      const isExperienceComplete = () =>
        employments &&
        employments.length > 0 &&
        employments.every((emp) =>
          [
            'company',
            'title',
            'city',
            'state',
            'country',
            'startDate',
            'endDate',
          ].every((field) => emp[field]),
        );

      const isEducationComplete = () =>
        educations &&
        educations.length > 0 &&
        educations.every((edu) =>
          [
            'institution',
            'degree',
            'fieldOfStudy',
            'city',
            'state',
            'country',
            'startDate',
            'endDate',
          ].every((field) => edu[field]),
        );

      const isSkillsComplete = () =>
        skills &&
        skills.length > 0 &&
        skills.every((skill) => skill.skillId && skill.proficiencyLevel);

      const isOtherComplete = () =>
        userInfo &&
        ['hobbies', 'languagesKnown', 'summary', 'marriedStatus'].every(
          (field) => userInfo[field],
        );

      // Determine completion status for each step
      const completionStatus = steps.map((step) => {
        switch (step.field) {
          case 'userInfo':
            return { ...step, completed: isContactComplete() };
          case 'employments':
            return { ...step, completed: isExperienceComplete() };
          case 'educations':
            return { ...step, completed: isEducationComplete() };
          case 'skills':
            return { ...step, completed: isSkillsComplete() };
          case 'additionalDetails':
            return { ...step, completed: isOtherComplete() };
          default:
            return { ...step, completed: false }; // Placeholder for additional details
        }
      });

      // Return completion status along with user data
      return completionStatus;
    } catch (error) {
      throw new Error(`Failed to fetch user info: ${error.message}`);
    }
  }
}
