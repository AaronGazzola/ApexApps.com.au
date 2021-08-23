import { Document } from 'mongoose';
import { Project } from '../../projects/interfaces/project.interface';
import { Client } from './client.interface';

export interface User extends Document {
  userName: string;
  clientName: string;
  password: string;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
  email: string;
  newEmail: string;
  isVerified: boolean;
  isAdmin: boolean;
  verifyUserToken: string;
  verifyEmailToken: string;
  _id: string;
  projects: Project[];
  project?: Project;
  client?: Client;
}
