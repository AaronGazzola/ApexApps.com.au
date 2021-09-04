import { Document } from 'mongoose';
import { Feature } from './feature.interface';
import { Update } from './update.interface';

export interface Milestone extends Document {
  title: string;
  _id: string;
  startDate: Date;
  endDate: Date;
  price: number;
  currency: string;
  notes?: string;
  buttonLabel?: string;
  buttonLink?: string;
  features?: Feature[];
  updates?: Update[];
}
