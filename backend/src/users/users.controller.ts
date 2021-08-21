import { AddUserDto } from './dto/add-user.dto';
import { UsersService } from './users.service';
import {
  Controller,
  Put,
  Post,
  UseGuards,
  Body,
  ValidationPipe,
  Request,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Put('/')
  async updateUser(
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    return await this.usersService.updateUser(updateUserDto, req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async addUser(@Body(ValidationPipe) addUserDto: AddUserDto, @Request() req) {
    return await this.usersService.addUser(addUserDto.name, req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getUsers(@Request() req) {
    return await this.usersService.getUsers(req.user._id);
  }
}
