import { Document } from 'mongoose';

export interface Proposal extends Document {
  title: string;
  sections: {
    title: string;
    content: string;
    buttonLabel: string;
    buttonLink: string;
  }[];
  videoLink: string;
  _id: string;
}
