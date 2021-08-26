import * as mongoose from 'mongoose';
import { ProjectSchema } from 'src/projects/schemas/project.schema';

export const UserSchema = new mongoose.Schema({
  userName: String,
  clientName: {
    type: String,
    unique: true,
  },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  password: {
    type: String,
    required: false,
    minlength: 6,
    select: false,
  },
  resetPasswordToken: { type: String, select: false },
  resetPasswordExpire: Date,
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  newEmail: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  verifyUserToken: { type: String, select: false },
  verifyEmailToken: { type: String, select: false },
  projects: [ProjectSchema],
  project: ProjectSchema,
});
