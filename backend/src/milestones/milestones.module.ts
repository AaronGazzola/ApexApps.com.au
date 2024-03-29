import { StepSchema } from './schemas/step.schema';
import { FeatureSchema } from './schemas/feature.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/schemas/user.schema';
import { MilestonesController } from './milestones.controller';
import { MilestonesService } from './milestones.service';
import { MilestoneSchema } from './schemas/milestone.schema';
import { ProjectSchema } from '../projects/schemas/project.schema';
import { UpdateSchema } from './schemas/update.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Milestone', schema: MilestoneSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Project', schema: ProjectSchema },
      { name: 'Feature', schema: FeatureSchema },
      { name: 'Step', schema: StepSchema },
      { name: 'Feature', schema: FeatureSchema },
      { name: 'Update', schema: UpdateSchema },
    ]),
  ],
  controllers: [MilestonesController],
  providers: [MilestonesService],
})
export class MilestonesModule {}
