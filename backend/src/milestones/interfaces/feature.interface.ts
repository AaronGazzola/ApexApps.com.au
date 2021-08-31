import { Document } from 'mongoose';

export interface Feature extends Document {
  title: string;
  state: 'planned' | 'inProgress' | 'completed';
  steps: string[];
  _id: string;
}
