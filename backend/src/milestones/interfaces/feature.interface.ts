import { Document } from 'mongoose';

export interface Feature {
  title: string;
  state: 'planned' | 'inProgress' | 'completed';
  steps: string[];
}
