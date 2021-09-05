import * as mongoose from 'mongoose';

export const ProposalSchema = new mongoose.Schema({
  title: String,
  sections: [
    {
      title: String,
      content: String,
      buttonLabel: String,
      buttonLink: String,
    },
  ],
  videoLink: String,
  withClient: { type: Boolean, default: false },
});
