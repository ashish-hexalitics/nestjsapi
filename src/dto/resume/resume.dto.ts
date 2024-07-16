import { UserSkill } from '../../schemas/user.skill.schema';
import { UserEducation } from '../../schemas/user.education.schema';
import { UserEmployment } from '../../schemas/user.employment.schema';
import { UserInfo } from '../../schemas/user.info.schema';
import { User } from '../../schemas/user.schema';

export class ResumeDto {
  user: User | null;
  personalDetails: UserInfo | null;
  skills: UserSkill[];
  education: UserEducation[];
  employment: UserEmployment[];
}
