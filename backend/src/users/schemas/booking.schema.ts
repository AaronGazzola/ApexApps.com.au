import * as mongoose from 'mongoose';

export const BookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  contactEmail: String,
  projectTitle: String,
  projectDescription: String,
  contactMethod: String,
  phone: String,
  zoomName: String,
  callTime: Date,
  confirmed: { type: Boolean, default: false },
});
