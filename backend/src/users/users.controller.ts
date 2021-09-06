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
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { SendVerifyUserDto } from './dto/send-verify-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { AddProposalDto } from './dto/add-proposal.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Put('/')
  async updateUser(
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    return await this.usersService.updateUser(updateUserDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async addUser(@Body(ValidationPipe) addUserDto: AddUserDto, @Request() req) {
    return await this.usersService.addUser(addUserDto.name, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getUsers(@Request() req) {
    return await this.usersService.getUsers(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/client')
  async updateClient(
    @Body(ValidationPipe) updateClientDto: UpdateClientDto,
    @Request() req,
  ) {
    return await this.usersService.updateClient(updateClientDto, req.user);
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

  @Post('reset-password')
  async resetPassword(
    @Body(ValidationPipe) resetPasswordDto: ResetPasswordDto,
  ) {
    const { token, password } = resetPasswordDto;
    return await this.usersService.resetPassword(token, password);
  }

  @UseGuards(JwtAuthGuard)
  @Post('set-client')
  async setClient(
    @Body() { clientName }: { clientName: string },
    @Request() req,
  ) {
    return await this.usersService.setClient(clientName, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('proposals')
  async addProposal(@Body() addProposalDto: AddProposalDto, @Request() req) {
    return await this.usersService.addProposal(req.user, addProposalDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('proposals')
  async editProposal(
    @Body()
    { proposal, proposalId }: { proposal: AddProposalDto; proposalId: string },
    @Request() req,
  ) {
    return await this.usersService.editProposal(req.user, proposal, proposalId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('proposals')
  async getProposals(@Request() req) {
    return await this.usersService.getProposals(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('proposals/client')
  async getProposal(@Request() req) {
    return await this.usersService.getProposal(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('proposals/set')
  async setProposal(
    @Request() req,
    @Body() { proposalId }: { proposalId: string },
  ) {
    return await this.usersService.setProposal(req.user, proposalId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('proposals/:pid')
  async deleteProposal(@Request() req) {
    return await this.usersService.deleteProposal(req.user);
  }

  @Get('/proposals/:pid')
  async getProposalById() {
    return await this.usersService.getProposalById();
  }
}
