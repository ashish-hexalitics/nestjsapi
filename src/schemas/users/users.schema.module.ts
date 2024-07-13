import { Module } from '@nestjs/common';
import { UsersSchemaService } from './users.schema.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { RolesModule } from '../roles/roles.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    RolesModule
  ],
  providers: [UsersSchemaService],
  exports: [UsersSchemaService],
})
export class UsersSchemaModule {}
