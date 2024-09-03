import { UserSkill } from '../../schemas/user.skill.schema';
import { UserEducation } from '../../schemas/user.education.schema';
import { UserEmployment } from '../../schemas/user.employment.schema';
import { User } from '../../schemas/user.schema';

export class ResumeDto {
  user: User | null;
  skills: UserSkill[];
  education: UserEducation[];
  employment: UserEmployment[];
}

export class CreateResumeDto  {
  document: string;
  templateName: string;
  categoryId: string;
  layer: any[];
}

export class UpdateResumeDto  {
  document: string;
  layer: any[];
}