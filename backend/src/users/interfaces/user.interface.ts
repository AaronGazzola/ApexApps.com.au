import { Document } from 'mongoose';

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
}
