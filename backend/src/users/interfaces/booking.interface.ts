import { Document } from 'mongoose';

export interface Booking extends Document {
  name: string;
  email: string;
  contactEmail: string;
  projectTitle: string;
  projectDescription: string;
  contactMethod: string;
  phone: string;
  zoomName: string;
  callTime: Date;
  confirmed: boolean;
}
