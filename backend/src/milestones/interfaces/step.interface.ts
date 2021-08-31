import { Document } from 'mongoose';

export interface Step extends Document {
  content: string;
  _id: string;
}
