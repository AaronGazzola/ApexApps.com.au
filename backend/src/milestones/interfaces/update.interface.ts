import { Document } from 'mongoose';

export interface Update extends Document {
  _id: string;
  date: Date;
  notes?: string;
  buttonLabel?: string;
  buttonLink?: string;
  publish: boolean;
}
