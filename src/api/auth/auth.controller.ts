import { Controller, Post,Get,Body,ValidationPipe } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { CreateUserDto } from '../../dto/users/create.dto';
import { LoginDto } from '../../dto/users/login.dto';

@Controller('/api/auth')
export class AuthController {
    constructor(private  readonly authService: AuthService){}

    @Post('register')
    async register(@Body(new ValidationPipe()) userDto: CreateUserDto) {
      return this.authService.register(userDto);
    }
  
    @Post('login')
    async login(@Body(new ValidationPipe()) loginDto: LoginDto) {
      const user = await this.authService.validateUser(loginDto);
      if (!user) {
        return { message: 'Invalid credentials' };
      }
      return this.authService.login(user);
    }
    @Get()
    getAuthRoot(): string {
        return this.authService.getAuthRoot();
    }
}
