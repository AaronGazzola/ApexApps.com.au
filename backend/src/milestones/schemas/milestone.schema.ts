import * as mongoose from 'mongoose';

export const MilestoneSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startDate: Date,
  endDate: Date,
  price: Number,
  currency: String,
  notes: String,
  buttonLabel: String,
  buttonLink: String,
  features: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feature' }],
});
