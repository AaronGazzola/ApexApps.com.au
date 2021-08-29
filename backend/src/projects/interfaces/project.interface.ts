import { Document } from 'mongoose';
import { Milestone } from '../../milestones/interfaces/milestone.interface';

export interface Project extends Document {
  title: string;
  description?: string;
  contractUploaded: boolean;
  milestones: Milestone[];
  estimate?: {
    startFrom: Date;
    startTo: Date;
    endFrom: Date;
    endTo: Date;
    costFrom: number;
    costTo: number;
    currency: string;
  };
}
