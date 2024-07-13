import { Injectable } from '@nestjs/common';
import { UsersService } from '../../schemas/users/users.service';
import { RolesService } from '../../schemas/roles/roles.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../../dto/users/create.dto';
import { LoginDto } from 'src/dto/users/login.dto';
import { JwtService } from '@nestjs/jwt';

export interface IUser {
  name: string;
  email: string;
  password?: string;
  _id?: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private rolesService: RolesService,
  ) {}

  async register(userDto: CreateUserDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const role: any = await this.rolesService.findOneByName(userDto.role);
    if (!role) {
      return { message: `Role '${userDto.role}' not found`, status: 'error' };
    }
    const user = await this.usersService.create({
      ...userDto,
      password: hashedPassword,
      role: role._id,
    });
    return user;
  }

  async validateUser(userDto: LoginDto): Promise<any> {
    const user: any = await this.usersService.findOne(userDto.email);
    if (user && (await bcrypt.compare(userDto.password, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: IUser) {
    const payload = { email: user.email, sub: user._id };
    return {
      data: {
        access_token: this.jwtService.sign(payload),
        user,
      },
    };
  }

  getAuthRoot(): string {
    return 'Auth Root';
  }
}
