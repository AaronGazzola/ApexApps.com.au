import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from '../projects/interfaces/project.interface';
import { User } from '../users/interfaces/user.interface';
import { Milestone } from './interfaces/milestone.interface';

@Injectable()
export class MilestonesService {
  constructor(
    @InjectModel('Milestone') private milestoneModel: Model<Milestone>,
    @InjectModel('Project') private projectModel: Model<Project>,
  ) {}

  async getMilestones(user: User) {
    const project = await this.projectModel
      .findById(user.project._id)
      .populate('milestones');

    return {
      success: true,
      milestones: project.milestones,
    };
  }

  async addMilestone(user: User, index: number) {
    const project = await this.projectModel
      .findById(user.project._id)
      .populate('milestones');

    const milestone = await this.milestoneModel.create({
      title: `Milestone ${index + 1}`,
    });

    project.milestones.splice(index, 0, milestone);

    await project.save();

    return {
      success: true,
      milestones: project.milestones,
    };
  }
}
