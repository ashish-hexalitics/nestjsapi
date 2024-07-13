import {
    Controller,
    Get,
    Post,
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
  import { UpdateUserDto } from '../../dto/users/update.dto';
  import { Request, Response } from 'express';
  
  @Controller('/api/users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Get()
    async findAll(@Res() res: Response) {
      const users = await this.usersService.findAll();
      return res.status(HttpStatus.OK).json(users);
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string, @Res() res: Response) {
      const user = await this.usersService.findOne(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return res.status(HttpStatus.OK).json(user);
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
  }
  