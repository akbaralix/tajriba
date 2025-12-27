// models/ResumeView.js
import mongoose from "mongoose";

const ResumeViewSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

ResumeViewSchema.index({ resumeId: 1, userId: 1 }, { unique: true });

export default mongoose.model("ResumeView", ResumeViewSchema);
