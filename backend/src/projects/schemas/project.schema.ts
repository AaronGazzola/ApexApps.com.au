import * as mongoose from 'mongoose';

export const ProjectSchema = new mongoose.Schema({
  title: { required: true, type: String },
  description: String,
  contract: String,
  estimate: {
    startFrom: Date,
    startTo: Date,
    endFrom: Date,
    endTo: Date,
    costFrom: Number,
    costTo: Number,
    currency: String,
  },
});
