import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { UsersSchemaService } from '../../schemas/users/users.schema.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersSchemaService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(403).json({
          message: 'User is not logged in',
          status: 'error',
        });
      }

      const token = authHeader.split(' ')[1];
      const decoded = this.jwtService.verify(token);
      const user = await this.usersService.findOne(decoded.email);
      if (!user) {
        return res.status(403).json({
          message: 'invalid token',
          status: 'error',
        });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(403).json({
        message: 'User is not logged in',
        status: 'error',
      });
    }
  }
}
