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

    const client = await this.userModel.findById(clientId).populate('projects');

    const projectTitleExists = client.projects.find(
      (project) => project.title === title,
    );

    if (!!projectTitleExists)
      throw new ErrorResponse(
        'A projec with this title already exists, please enter a unique title',
        400,
      );

    const project = await this.projectModel.create({ title });

    client.projects.push(project);

    await client.save();

    user.project = project;

    await user.save();

    return { success: true, projects: client.projects, project };
  }

  async getProjects(user: User) {
    const client = await this.userModel
      .findById(user.client._id)
      .populate('projects');

    return {
      success: true,
      projects: client.projects,
    };
  }
  async setProject(projectId: string, user: User) {
    const project = await this.projectModel.findById(projectId);

    user.project = project;

    await user.save();

    return {
      success: true,
      project,
    };
  }

  async deleteProject(user: User) {
    // find client on current user
    const client = await this.userModel
      .findById(user.client._id)
      .populate('projects');

    // filter current project out of client's projects array
    const projects = client.projects.filter(
      (item) => item._id.toString() !== user.project._id.toString(),
    );

    client.projects = projects;

    await client.save();

    const project = projects.length ? projects[0] : null;

    user.project = project;

    await user.save();

    return {
      success: true,
      projects,
      project,
    };
  }
}
