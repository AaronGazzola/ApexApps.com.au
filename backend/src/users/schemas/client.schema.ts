import * as mongoose from 'mongoose';
import { ProjectSchema } from 'src/projects/schemas/project.schema';

export const ClientSchema = new mongoose.Schema({
  clientName: String,
  email: {
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
  projects: [ProjectSchema],
  project: ProjectSchema,
});
