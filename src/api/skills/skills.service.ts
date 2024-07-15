import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill, SkillDocument } from '../../schemas/skill.schema';
import { UserSkill, UserSkillDocument } from '../../schemas/user.skill.schema';
import { SkillDto } from '../../dto/skills/skill.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectModel(Skill.name) private skillsModel: Model<SkillDocument>,
    @InjectModel(UserSkill.name) private userSkillsModel: Model<UserSkillDocument>,
  ) {}

  async getAllSkills(): Promise<Skill[]> {
    return this.skillsModel.find().exec();
  }

  async getSkill(skillId: string): Promise<Skill | null> {
    return this.skillsModel.findById(skillId).exec();
  }

  async createSkill(skillDto: SkillDto): Promise<Skill | null> {
    return this.skillsModel.create(skillDto);
  }

  async updateSkill(id: string, skillDto: SkillDto): Promise<Skill | null> {
    return this.skillsModel.findByIdAndUpdate(id, skillDto, { new: true }).exec();
  }

  async deleteSkill(skillId: string): Promise<Skill | null> {
    return this.skillsModel.findByIdAndDelete(skillId).exec();
  }
}
