import { AddProjectDto } from './dto/add-project.dto';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import ErrorResponse from 'src/shared/errorResponse';
import { User } from 'src/users/interfaces/user.interface';
import { Project } from './interfaces/project.interface';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel('Project') private projectModel: Model<Project>,
    @InjectModel('User') private userModel: Model<User>,
    @Inject(REQUEST) private readonly req: Request,
  ) {}

  async addProject(addProjectDto: AddProjectDto, user: User) {
    const { title, clientId } = addProjectDto;
    if (!user.isAdmin)
      throw new ErrorResponse('User must be admin to access this content', 401);

    const project = await this.projectModel.create({ title });

    const client = await this.userModel.findById(clientId).populate('projects');

    client.projects.push(project);

    await client.save();

    return { success: true, projects: client.projects };
  }

  async getProjects(user: User) {
    const id = this.req.params.id;
    if (!user.isAdmin && id !== user._id)
      throw new ErrorResponse('Not authorized to view this content', 401);

    const client = await this.userModel.findById(id).populate('projects');

    return {
      success: true,
      projects: client.projects,
    };
  }
}
