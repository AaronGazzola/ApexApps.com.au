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
import { UpdateClientDto } from './dto/update-client.dto';
import { SendVerifyUserDto } from './dto/send-verify-user.dto';

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

  @UseGuards(JwtAuthGuard)
  @Put('/client')
  async updateClient(
    @Body(ValidationPipe) updateClientDto: UpdateClientDto,
    @Request() req,
  ) {
    return await this.usersService.updateClient(updateClientDto, req.user._id);
  }

  @Post('send-verify-user')
  async sendUserVerify(
    @Body(ValidationPipe) sendVerifyUserDto: SendVerifyUserDto,
  ) {
    return await this.usersService.sendVerifyUser(sendVerifyUserDto.email);
  }

  @Post('find-by-id')
  async findUserById(@Body() { id }: { id: string }) {
    return await this.usersService.findUserById(id);
  }

  @Post('verify-user')
  async verifyUser(@Body() { token }: { token: string }) {
    return await this.usersService.verifyUser(token);
  }

  @Post('verify-email')
  async verifyEmail(@Body() { token }: { token: string }) {
    return await this.usersService.verifyEmail(token);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() { email }: { email: string }) {
    return await this.usersService.forgotPassword(email);
  }
}
