import * as mongoose from 'mongoose';

export const FeatureSchema = new mongoose.Schema({
  title: String,
  state: String,
  steps: [String],
});
