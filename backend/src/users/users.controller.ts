import { UsersService } from './users.service';
import {
  Controller,
  Put,
  UseGuards,
  Body,
  ValidationPipe,
  Request,
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
}
