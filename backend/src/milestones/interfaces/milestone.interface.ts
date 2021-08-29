import { Document } from 'mongoose';

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
}
