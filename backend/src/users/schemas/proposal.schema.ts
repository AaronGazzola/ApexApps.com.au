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
  introVideo: String,
});
