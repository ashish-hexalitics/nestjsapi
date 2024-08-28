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
import {
  ResumeDto,
  CreateResumeDto,
  UpdateResumeDto,
} from '../../dto/resume/resume.dto';
import { Contentet, ContentetDocument } from '../../schemas/document.schema';
import { IUser } from '../../interfaces/user.interface'; // Adjust the path as needed
import { Role } from '../../enums/role.enum';
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
    @Body() resumeData: CreateResumeDto,
    @Req() req: Request & { user: IUser },
  ) {
    try {
      const user: IUser = req.user;
      const contentet = await this.contentetModel.create({
        createdBy: user._id,
        document: resumeData.document,
        categoryId: resumeData.categoryId,
        layer: resumeData.layer,
      });
      return contentet;
    } catch (error) {
      return error;
    }
  }

  async getResumeTemplates(@Req() req: Request & { user: IUser }) {
    try {
      const user: IUser = req.user;
      const roleName = user.role.name;
      console.log(roleName);
      const contentets = await this.contentetModel.find({
        ...(roleName === Role.Utilizer ? {} : { createdBy: user._id }),
      });
      return contentets;
    } catch (error) {
      return error;
    }
  }

  async getResumeTemplate(templateId: string) {
    try {
      const contentets = await this.contentetModel.findOne({
        _id: templateId,
      });
      return contentets;
    } catch (error) {
      return error;
    }
  }

  async updateTemplate(templateId: string, resumeData: UpdateResumeDto) {
    try {
      const contentets = await this.contentetModel.findOneAndUpdate(
        {
          _id: templateId,
        },
        resumeData,
        { new: true },
      );
      return contentets;
    } catch (error) {
      return error;
    }
  }
  async deleteTemplate(templateId: string) {
    try {
      const contentets = await this.contentetModel.findOneAndDelete({
        _id: templateId,
      });
      return contentets;
    } catch (error) {
      return error;
    }
  }
}
