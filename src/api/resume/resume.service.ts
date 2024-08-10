import {
  Injectable,
  NotFoundException,
  Req,
  Res,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSkill, UserSkillDocument } from '../../schemas/user.skill.schema';
import {
  UserEmployment,
  UserEmploymentDocument,
} from '../../schemas/user.employment.schema';
import {
  UserEducation,
  UserEducationDocument,
} from '../../schemas/user.education.schema';
import { User, UserDocument } from '../../schemas/user.schema';
import { UserInfo, UserInfoDocument } from '../../schemas/user.info.schema';
import { ResumeDto } from '../../dto/resume/resume.dto';
import { Contentet, ContentetDocument } from '../../schemas/document.schema';
import { IUser } from '../../interfaces/user.interface'; // Adjust the path as needed
@Injectable()
export class ResumeService {
  constructor(
    @InjectModel(UserSkill.name) private skillModel: Model<UserSkillDocument>,
    @InjectModel(UserEducation.name)
    private userEducationModel: Model<UserEducationDocument>,
    @InjectModel(UserEmployment.name)
    private userEmploymentModel: Model<UserEmploymentDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(UserInfo.name) private userInfoModel: Model<UserInfoDocument>,
    @InjectModel(Contentet.name)
    private contentetModel: Model<ContentetDocument>,
  ) {}

  async generateResume(userId: string): Promise<ResumeDto> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userDetails = await this.userModel
      .findOne({ _id: userId })
      .populate('userInfo');
    // const personalDetails = await this.userInfoModel.findOne({ userId });
    const skills = await this.skillModel.find({ userId }).populate('skillId');
    const education = await this.userEducationModel.find({ userId });
    const employment = await this.userEmploymentModel.find({ userId });

    const resumeData: ResumeDto = {
      user: userDetails,
      skills,
      education,
      employment,
    };

    return resumeData;
  }

  async createResumeTemplate(
    @Body() resumeData: { document: string },
    @Req() req: Request & { user: IUser },
  ) {
    try {
      const user: IUser = req.user;
      const contentet = await this.contentetModel.create({
        createdBy: user._id,
        document: resumeData.document,
      });
      return contentet;
    } catch (error) {
      return error;
    }
  }

  async getResumeTemplate(@Req() req: Request & { user: IUser }) {
    try {
      const user: IUser = req.user;
      const contentets = await this.contentetModel.find({
        createdBy: user._id,
      });
      return contentets;
    } catch (error) {
      return error;
    }
  }
}