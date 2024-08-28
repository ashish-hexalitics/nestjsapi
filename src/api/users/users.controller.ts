import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  HttpStatus,
  Res,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto, UserInfoDto } from '../../dto/users/user.dto';
import { Response } from 'express';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const users = await this.usersService.findAll();
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Users fetched successfully', users });
  }

  @Get('/:id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return res.status(HttpStatus.OK).json({
      message: 'User fetched successfully',
      user,
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const updatedUser = await this.usersService.update(id, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return res.status(HttpStatus.OK).json({
      message: 'User updated successfully',
      updatedUser,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const deletedUser = await this.usersService.remove(id);
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
    return res.status(HttpStatus.OK).json({
      message: 'User deleted successfully',
      deletedUser,
    });
  }

  @Put('/info/:id')
  async updateUserInfo(
    @Param('id') id: string,
    @Body() updateUserDto: UserInfoDto,
    @Res() res: Response,
  ) {
    const updatedUser = await this.usersService.updateUserInfo(
      id,
      updateUserDto,
    );
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return res.status(HttpStatus.OK).json({
      message: 'User updated successfully',
      updatedUser,
    });
  }

  @Get('/info/:id')
  async findUserInfo(@Param('id') id: string, @Res() res: Response) {
    const userInfo = await this.usersService.findUserInfo(id);
    if (!userInfo) {
      return res.status(HttpStatus.OK).json({
        message: 'userInfo not found',
        userInfo:{},
      });
    }
    return res.status(HttpStatus.OK).json({
      message: 'User fetched successfully',
      userInfo,
    });
  }

  @Get('/get/resume-data')
  async findUserResumeData(
    @Req() req: Request & { user: { _id: string } },
    @Res() res: Response,
  ) {
    try {
      const userId: string = req.user._id
      const data = await this.usersService.findUserResumeData(userId);
      return res.status(HttpStatus.OK).json({
        message: 'User resume data fetched successfully',
        data,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error});
    }
  }
}
