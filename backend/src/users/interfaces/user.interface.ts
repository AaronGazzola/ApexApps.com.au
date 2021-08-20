import { Document } from 'mongoose';

export interface User extends Document {
  userName: string;
  password: string;
  resetPasswordToken: string;
  resetPasswordExpire: string;
  email: string;
  newEmail: string;
  isVerified: boolean;
  verifyUserToken: string;
  verifyEmailToken: string;
  _id: string;
}
