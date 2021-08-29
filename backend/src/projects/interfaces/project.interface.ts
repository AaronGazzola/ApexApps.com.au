import { Document } from 'mongoose';

export interface Project extends Document {
  title: string;
  description?: string;
  contractUploaded: boolean;
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
