import { Document } from 'mongoose';

export interface Project extends Document {
  title: string;
  description?: string;
  contract?: string;
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
