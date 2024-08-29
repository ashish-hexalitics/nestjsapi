import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from '../../schemas/user.schema';
import { UserInfo, UserInfoSchema } from '../../schemas/user.info.schema';
import { RolesModule } from '../roles/roles.module';
import { UserEmployment, UserEmploymentSchema } from '../../schemas/user.employment.schema';
import { UserEducation, UserEducationSchema } from '../../schemas/user.education.schema';
import { UserSkill, UserSkillSchema } from '../../schemas/user.skill.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: UserInfo.name, schema: UserInfoSchema }]),
    MongooseModule.forFeature([{ name: UserEmployment.name, schema: UserEmploymentSchema }]),
    MongooseModule.forFeature([{ name: UserEducation.name, schema: UserEducationSchema }]),
    MongooseModule.forFeature([{ name: UserSkill.name, schema: UserSkillSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    RolesModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
 