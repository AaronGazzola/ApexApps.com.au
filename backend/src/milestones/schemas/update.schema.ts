import * as mongoose from 'mongoose';

export const UpdateSchema = new mongoose.Schema({
  date: Date,
  notes: String,
  buttonLabel: String,
  buttonLink: String,
  publish: Boolean,
});
