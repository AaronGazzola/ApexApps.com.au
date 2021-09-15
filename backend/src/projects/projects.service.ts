import * as path from 'path';
import * as fs from 'fs';
import { EditEstimateDto } from './dto/edit-estimate.dto';
import { EditProjectDto } from './dto/edit-project.dto';
import { AddProjectDto } from './dto/add-project.dto';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response } from 'express';
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
    const { title } = addProjectDto;

    if (!user.isAdmin)
      throw new ErrorResponse('User must be admin to access this content', 401);

    const client = await this.userModel
      .findById(user.client._id)
      .populate('projects');

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
    user.client = client;

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
    user.client = client;

    await user.save();

    return {
      success: true,
      projects,
      project,
    };
  }

  async editProject(user: User, editProjectDto: EditProjectDto) {
    const { title, description } = editProjectDto;

    // check if user is admin or user is client
    if (!user.isAdmin && user._id.toString() !== user.client._id.toString())
      throw new ErrorResponse('Not authorised to access this content', 401);

    const project = await this.projectModel.findById(user.project._id);

    const client = await this.userModel
      .findById(user.client._id)
      .populate('projects');

    // check if project is on client
    const projectFoundOnClient = client.projects.find(
      (item) => item._id.toString() === project._id.toString(),
    );

    if (!projectFoundOnClient)
      throw new ErrorResponse('Not authorised to access this content', 401);

    project.title = title;
    project.description = description;

    await project.save();

    const returnClient = await this.userModel
      .findById(user.client._id)
      .populate('projects');

    return {
      success: true,
      projects: returnClient.projects,
      project,
    };
  }

  async editEstimate(user: User, editEstimateDto: EditEstimateDto) {
    const { startFrom, startTo, endFrom, endTo, costFrom, costTo } =
      editEstimateDto;

    if (!user.isAdmin)
      throw new ErrorResponse('User must be admin to access this content', 401);

    const project = await this.projectModel.findById(user.project._id);

    project.estimate.startFrom = startFrom;
    project.estimate.startTo = startTo;
    project.estimate.endFrom = endFrom;
    project.estimate.endTo = endTo;
    project.estimate.costFrom = costFrom;
    project.estimate.costTo = costTo;

    await project.save();

    const client = await this.userModel
      .findById(user.client._id)
      .populate('projects');

    return {
      success: true,
      project,
      projects: client.projects,
    };
  }

  async uploadContract(user: User, file: any) {
    if (!user.isAdmin)
      throw new ErrorResponse('User must be admin to access this content', 401);

    if (!file || file.mimetype !== 'application/pdf')
      throw new ErrorResponse('Please upload a PDF file', 401);

    const project = await this.projectModel.findById(user.project._id);

    const fileName = `contract-${project._id}.pdf`;

    const filePath = `${process.env.UPLOAD_PATH}/${fileName}`;

    // rename uploaded file
    fs.rename(
      `${process.env.UPLOAD_PATH}/${file.filename}`,
      filePath,
      (err) => {
        if (err) throw new ErrorResponse('Problem with contract upload', 500);
      },
    );

    project.contractUploaded = true;

    await project.save();

    return {
      success: true,
      project,
    };
  }

  async downloadContract(res: Response) {
    const { pid: projectId } = this.req.params;

    const fileName = `contract-${projectId}.pdf`;

    const filePath = path.join(
      process.env.NODE_ENV === 'production'
        ? process.env.NODE_PATH_PROD
        : process.env.NODE_PATH_DEV,
      process.env.UPLOAD_PATH,
      fileName,
    );

    res.download(filePath);
  }
}
