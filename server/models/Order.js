import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    creator: { type: String, required: true },
    creatorpic: { type: String }, // optional, foydalanuvchi rasmi
    title: { type: String, required: true },
    description: { type: String, required: true },
    budget: { type: String, required: true },
    tguserorder: { type: String }, // optional, Telegram username
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
