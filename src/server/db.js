import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE); // eski opsiyalarni olib tashladik
    console.log("MongoDB ulanishi muvaffaqiyatli");
  } catch (error) {
    console.error("MongoDB ulanishda xatolik:", error);
    process.exit(1);
  }
};

export default connectDB;
