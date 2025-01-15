import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { SkillsModule } from './skills/skills.module';
import { EmploymentsModule } from './employments/employments.module';
import { EducationsModule } from './educations/educations.module';
import { ResumeModule } from './resume/resume.module';
import { TemplateCategoryModule } from './template-category/template-category.module';
import { AiController } from './ai/ai.controller';
import { AiModule } from './ai/ai.module';
@Module({
  imports: [
    RolesModule,
    AuthModule,
    UsersModule,
    SkillsModule,
    EmploymentsModule,
    EducationsModule,
    ResumeModule,
    TemplateCategoryModule,
    AiModule
  ],
  controllers: [ApiController, AiController],
  providers: [ApiService],
})
export class ApiModule {}