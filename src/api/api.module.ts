import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { SkillsModule } from './skills/skills.module';

@Module({
  imports: [RolesModule, AuthModule, UsersModule, SkillsModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
