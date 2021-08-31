import * as mongoose from 'mongoose';

export const FeatureSchema = new mongoose.Schema({
  title: String,
  state: String,
  steps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Step' }],
});
