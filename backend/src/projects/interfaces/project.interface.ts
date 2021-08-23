import { Document } from 'mongoose';

export interface Project extends Document {
  title: string;
  description?: string;
  contract?: string;
  estimate?: {
    startFrom: Date;
    startTo: Date;
    EndFrom: Date;
    EndTo: Date;
    costFrom: number;
    costTo: number;
  };
}
