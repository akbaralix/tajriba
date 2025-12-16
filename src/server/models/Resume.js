import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  kasb: { type: String, required: true },
  bio: { type: String, required: true },
  username: { type: String }, // foydalanuvchi ismi
  soha: { type: String }, // sohasi
  userpic: { type: String }, // rasm (base64 yoki URL)
  title: { type: String }, // ish e'lonining sarlavhasi
});

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;
