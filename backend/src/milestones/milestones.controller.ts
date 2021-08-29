import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
  Request,
  Get,
} from '@nestjs/common';
import { MilestonesService } from './milestones.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('milestones')
export class MilestonesController {
  constructor(private milestonesService: MilestonesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async addProject(@Body() { index }: { index: number }, @Request() req) {
    return await this.milestonesService.addMilestone(req.user, index);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getProjects(@Request() req) {
    return await this.milestonesService.getMilestones(req.user);
  }
}
