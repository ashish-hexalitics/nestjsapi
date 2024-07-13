import { Module,MiddlewareConsumer,RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { RolesService } from '../../schemas/roles/roles.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { RolesModule } from '../../schemas/roles/roles.module';
import { AuthMiddleware } from './auth.middleware';


@Module({
  imports: [
    UsersModule,
    RolesModule,
    PassportModule,
    JwtModule.register({
      secret: 'xgyjwmkzwklgdywmzjsoismqskjxxjww',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/api/users', method: RequestMethod.ALL },
        { path: '/api/auth/another-protected-route', method: RequestMethod.ALL },
      );
  }
}