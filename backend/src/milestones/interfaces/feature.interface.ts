import { Document } from 'mongoose';
import { Step } from './step.interface';

export interface Feature extends Document {
  title: string;
  state: 'planned' | 'inProgress' | 'completed';
  steps: Step[];
  _id: string;
}
