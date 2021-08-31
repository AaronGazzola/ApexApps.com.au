import { Feature } from './interfaces/feature.interface';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from '../projects/interfaces/project.interface';
import { User } from '../users/interfaces/user.interface';
import { Milestone } from './interfaces/milestone.interface';
import ErrorResponse from 'src/shared/errorResponse';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class MilestonesService {
  constructor(
    @InjectModel('Milestone') private milestoneModel: Model<Milestone>,
    @InjectModel('Feature') private featureModel: Model<Feature>,
    @InjectModel('Project') private projectModel: Model<Project>,
    @Inject(REQUEST) private readonly req: Request,
  ) {}

  async getMilestones(user: User) {
    const project = await this.projectModel
      .findById(user.project._id)
      .populate({
        path: 'milestones',
        populate: { path: 'features' },
      });

    return {
      success: true,
      milestones: project.milestones,
    };
  }

  async addMilestone(user: User, index: number) {
    if (!user.isAdmin)
      throw new ErrorResponse('User must be admin to access this content', 401);

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

  async addFeature(user: User, index: number, milestoneId: string) {
    if (!user.isAdmin)
      throw new ErrorResponse('User must be admin to access this content', 401);

    const milestone = await this.milestoneModel
      .findById(milestoneId)
      .populate('features');

    const feature = await this.featureModel.create({});

    milestone.features.splice(index, 0, feature);

    await milestone.save();

    const project = await this.projectModel
      .findById(user.project._id)
      .populate({
        path: 'milestones',
        populate: { path: 'features' },
      });

    return {
      success: true,
      milestones: project.milestones,
    };
  }

  async addStep(user: User, index: number, featureId: string) {
    if (!user.isAdmin)
      throw new ErrorResponse('User must be admin to access this content', 401);

    const feature = await this.featureModel.findById(featureId);

    feature.steps.splice(index, 0, '');

    await feature.save();

    const project = await this.projectModel
      .findById(user.project._id)
      .populate({
        path: 'milestones',
        populate: { path: 'features' },
      });

    return {
      success: true,
      milestones: project.milestones,
    };
  }

  async editMilestone(user: User, newMilestone: Milestone) {
    if (!user.isAdmin)
      throw new ErrorResponse('User must be admin to access this content', 401);

    let milestone = await this.milestoneModel
      .findById(newMilestone._id)
      .populate('features');

    milestone.title = newMilestone.title;
    milestone.startDate = newMilestone.startDate;
    milestone.endDate = newMilestone.endDate;
    milestone.price = newMilestone.price;
    milestone.currency = newMilestone.currency;
    milestone.notes = newMilestone.notes;
    milestone.buttonLabel = newMilestone.buttonLabel;
    milestone.buttonLink = newMilestone.buttonLink;

    milestone.features.forEach(async (feature) => {
      const newFeature = newMilestone.features.find(
        (item) => item._id.toString() === feature._id.toString(),
      );
      feature.title = newFeature.title;
      feature.state = newFeature.state;
      feature.steps = newFeature.steps;
      await feature.save();
    });

    await milestone.save();

    const project = await this.projectModel
      .findById(user.project._id)
      .populate({
        path: 'milestones',
        populate: { path: 'features' },
      });

    return {
      success: true,
      milestones: project.milestones,
    };
  }

  async deleteMilestone(user: User) {
    if (!user.isAdmin)
      throw new ErrorResponse('User must be admin to access this content', 401);

    const { mid: milestoneId } = this.req.params;

    await this.milestoneModel.findByIdAndDelete(milestoneId);

    const project = await this.projectModel
      .findById(user.project._id)
      .populate({
        path: 'milestones',
        populate: { path: 'features' },
      });

    return {
      success: true,
      milestones: project.milestones,
    };
  }

  async deleteFeature(user: User) {
    if (!user.isAdmin)
      throw new ErrorResponse('User must be admin to access this content', 401);

    const { fid: featureId } = this.req.params;

    await this.featureModel.findByIdAndDelete(featureId);

    const project = await this.projectModel
      .findById(user.project._id)
      .populate({
        path: 'milestones',
        populate: { path: 'features' },
      });

    return {
      success: true,
      milestones: project.milestones,
    };
  }
}
