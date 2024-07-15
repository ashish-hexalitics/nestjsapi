import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  UserEducation,
  UserEducationDocument,
} from '../../schemas/user.education.schema';
import { UserEducationDto } from '../../dto/education/user.education.dto';

@Injectable()
export class EducationsService {
  constructor(
    @InjectModel(UserEducation.name)
    private userEducationModel: Model<UserEducationDocument>,
  ) {}

  async getAllUserEducations(userId: string): Promise<UserEducation[]> {
    return this.userEducationModel.find({ userId }).exec();
  }

  async createUserEducation(userEducationDto: UserEducationDto): Promise<UserEducation> {
    return this.userEducationModel.create(userEducationDto);
  }

  async updateUserEducation(id: string, userEducationDto: UserEducationDto): Promise<UserEducation | null> {
    return this.userEducationModel.findByIdAndUpdate(id, userEducationDto, { new: true }).exec();
  }

  async deleteUserEducation(id: string): Promise<UserEducation | null> {
    return this.userEducationModel.findByIdAndDelete(id).exec();
  }
  
}
