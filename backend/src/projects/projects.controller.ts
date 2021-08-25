import { ProjectsService } from './projects.service';
import {
  Controller,
  UseGuards,
  Post,
  Body,
  Request,
  ValidationPipe,
  Get,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddProjectDto } from './dto/add-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async addProject(
    @Body(ValidationPipe) addProjectDto: AddProjectDto,
    @Request() req,
  ) {
    return await this.projectsService.addProject(addProjectDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getProjects(@Request() req) {
    return await this.projectsService.getProjects(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/set-active')
  async setProject(@Body() { id }: { id: string }, @Request() req) {
    return await this.projectsService.setProject(id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/')
  async deleteProject(@Request() req) {
    return await this.projectsService.deleteProject(req.user);
  }
}
