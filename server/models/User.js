import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    name: String,
    email: String,
    photo: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
