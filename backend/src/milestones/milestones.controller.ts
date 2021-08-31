import {
  Body,
  Controller,
  Post,
  UseGuards,
  Put,
  ValidationPipe,
  Request,
  Get,
  Delete,
} from '@nestjs/common';
import { MilestonesService } from './milestones.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Milestone } from './interfaces/milestone.interface';

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
  @UseGuards(JwtAuthGuard)
  @Post('/feature')
  async addFeature(
    @Body() { index, milestoneId }: { index: number; milestoneId: string },
    @Request() req,
  ) {
    return await this.milestonesService.addFeature(
      req.user,
      index,
      milestoneId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('/step')
  async addStep(
    @Body() { index, featureId }: { index: number; featureId: string },
    @Request() req,
  ) {
    return await this.milestonesService.addStep(req.user, index, featureId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/')
  async editMilestone(@Body() milestone: Milestone, @Request() req) {
    return await this.milestonesService.editMilestone(req.user, milestone);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:mid')
  async deleteMilestone(@Request() req) {
    return await this.milestonesService.deleteMilestone(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/feature/:fid')
  async deleteFeature(@Request() req) {
    return await this.milestonesService.deleteFeature(req.user);
  }
}
