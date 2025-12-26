import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  kasb: { type: String, required: true },
  bio: { type: String, required: true },
  tguser: { type: String },
  username: { type: String },
  userpic: { type: String },
  title: { type: String },
});

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;
