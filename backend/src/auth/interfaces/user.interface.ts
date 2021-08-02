import { Document } from 'mongoose';

export interface User extends Document {
  readonly userName: string;
  readonly password: string;
  readonly resetPasswordToken: string;
  readonly resetPasswordExpire: string;
  readonly email: string;
  readonly newEmail: string;
  readonly isVerified: boolean;
  readonly verifyUserToken: string;
  readonly verifyEmailToken: string;
}
