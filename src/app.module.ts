import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesModule } from './schemas/roles/roles.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    RolesModule,
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
