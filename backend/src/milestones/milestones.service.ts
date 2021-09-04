import { UpdateDto } from './dto/update.dto';
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
import { Step } from './interfaces/step.interface';
import { Update } from './interfaces/update.interface';

@Injectable()
export class MilestonesService {
  constructor(
    @InjectModel('Milestone') private milestoneModel: Model<Milestone>,
    @InjectModel('Feature') private featureModel: Model<Feature>,
    @InjectModel('Project') private projectModel: Model<Project>,
    @InjectModel('Step') private stepModel: Model<Step>,
    @InjectModel('Update') private updateModel: Model<Update>,
    @Inject(REQUEST) private readonly req: Request,
  ) {}

  async getMilestones(user: User) {
    const project = await this.projectModel
      .findById(user.project._id)
      .populate({
        path: 'milestones',
        populate: [
          {
            path: 'features',
            populate: {
              path: 'steps',
            },
          },
          {
            path: 'updates',
          },
        ],
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
      .populate({
        path: 'milestones',
        populate: [
          {
            path: 'features',
            populate: {
              path: 'steps',
            },
          },
          {
            path: 'updates',
          },
        ],
      });

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

    const feature = await this.featureModel.create({
      title: `Feature ${index + 1}`,
    });

    milestone.features.splice(index, 0, feature);

    await milestone.save();

    const project = await this.projectModel
      .findById(user.project._id)
      .populate({
        path: 'milestones',
        populate: [
          {
            path: 'features',
            populate: {
              path: 'steps',
            },
          },
          {
            path: 'updates',
          },
        ],
      });

    return {
      success: true,
      milestones: project.milestones,
      feature,
    };
  }

  async addStep(user: User, index: number, featureId: string) {
    if (!user.isAdmin)
      throw new ErrorResponse('User must be admin to access this content', 401);

    const feature = await this.featureModel.findById(featureId);

    const step = await this.stepModel.create({ content: `Step ${index + 1}` });

    feature.steps.splice(index, 0, step);

    await feature.save();

    const project = await this.projectModel
      .findById(user.project._id)
      .populate({
        path: 'milestones',
        populate: [
          {
            path: 'features',
            populate: {
              path: 'steps',
            },
          },
          {
            path: 'updates',
          },
        ],
      });

    return {
      success: true,
      milestones: project.milestones,
      step,
    };
  }

  async editMilestone(user: User, milestone: Milestone) {
    if (!user.isAdmin)
      throw new ErrorResponse('User must be admin to access this content', 401);

    await this.milestoneModel.findByIdAndUpdate(milestone._id, milestone);

    milestone.features.forEach(async (feature) => {
      await this.featureModel.findByIdAndUpdate(feature._id, feature);
      feature.steps.forEach(async (step) => {
        await this.stepModel.findByIdAndUpdate(step._id, step);
      });
    });

    const project = await this.projectModel
      .findById(user.project._id)
      .populate({
        path: 'milestones',
        populate: [
          {
            path: 'features',
            populate: {
              path: 'steps',
            },
          },
          {
            path: 'updates',
          },
        ],
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
        populate: [
          {
            path: 'features',
            populate: {
              path: 'steps',
            },
          },
          {
            path: 'updates',
          },
        ],
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
        populate: [
          {
            path: 'features',
            populate: {
              path: 'steps',
            },
          },
          {
            path: 'updates',
          },
        ],
      });

    return {
      success: true,
      milestones: project.milestones,
    };
  }

  async deleteStep(user: User) {
    if (!user.isAdmin)
      throw new ErrorResponse('User must be admin to access this content', 401);

    const { sid: stepId } = this.req.params;

    await this.stepModel.findByIdAndDelete(stepId);

    const project = await this.projectModel
      .findById(user.project._id)
      .populate({
        path: 'milestones',
        populate: [
          {
            path: 'features',
            populate: {
              path: 'steps',
            },
          },
          {
            path: 'updates',
          },
        ],
      });

    return {
      success: true,
      milestones: project.milestones,
    };
  }
  async addUpdate(user: User, updateDto: UpdateDto) {
    if (!user.isAdmin)
      throw new ErrorResponse('User must be admin to access this content', 401);

    const {
      id: milestoneId,
      notes,
      date,
      buttonLink,
      buttonLabel,
      publish,
    } = updateDto;

    const milestone = await this.milestoneModel.findById(milestoneId);

    const update = await this.updateModel.create({
      date,
      notes,
      buttonLink,
      buttonLabel,
      publish,
    });

    milestone.updates.push(update);

    await milestone.save();

    const project = await this.projectModel
      .findById(user.project._id)
      .populate({
        path: 'milestones',
        populate: [
          {
            path: 'features',
            populate: {
              path: 'steps',
            },
          },
          {
            path: 'updates',
          },
        ],
      });

    return {
      success: true,
      milestones: project.milestones,
      update,
    };
  }

  async deleteUpdate(user: User) {
    if (!user.isAdmin)
      throw new ErrorResponse('User must be admin to access this content', 401);

    const { uid: updateId } = this.req.params;

    await this.updateModel.findByIdAndDelete(updateId);

    const project = await this.projectModel
      .findById(user.project._id)
      .populate({
        path: 'milestones',
        populate: [
          {
            path: 'features',
            populate: {
              path: 'steps',
            },
          },
          {
            path: 'updates',
          },
        ],
      });

    return {
      success: true,
      milestones: project.milestones,
    };
  }

  async editUpdate(user: User, updateDto: UpdateDto) {
    if (!user.isAdmin)
      throw new ErrorResponse('User must be admin to access this content', 401);
    const {
      id: updateId,
      notes,
      date,
      buttonLink,
      buttonLabel,
      publish,
    } = updateDto;

    const update = await this.updateModel.findById(updateId);
    update.notes = notes;
    update.date = date;
    update.buttonLink = buttonLink;
    update.buttonLabel = buttonLabel;
    update.publish = publish;

    await update.save();

    const project = await this.projectModel
      .findById(user.project._id)
      .populate({
        path: 'milestones',
        populate: [
          {
            path: 'features',
            populate: {
              path: 'steps',
            },
          },
          {
            path: 'updates',
          },
        ],
      });
    return {
      success: true,
      milestones: project.milestones,
    };
  }
}
