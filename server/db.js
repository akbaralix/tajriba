import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://tursunboyevakbarali807_db_user:fBuEm29mZLPpZgKq@cluster0.rcjkua0.mongodb.net/?appName=Cluster0"
    );
    console.log("MongoDB ulanishi muvaffaqiyatli");
  } catch (error) {
    console.error("MongoDB ulanishda xatolik:", error.message);
    process.exit(1);
  }
};

export default connectDB;

