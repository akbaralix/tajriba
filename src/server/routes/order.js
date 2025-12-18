import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// Buyurtma yaratish
router.post("/create", async (req, res) => {
  const {
    userId,
    creator,
    creatorpic,
    title,
    description,
    budget,
    tguserorder,
  } = req.body;

  try {
    const newOrder = new Order({
      userId,
      creator,
      creatorpic,
      title,
      description,
      budget,
      tguserorder,
    });

    await newOrder.save();
    res.json({ message: "Buyurtma saqlandi", order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server xatolik" });
  }
});

// Barcha buyurtmalarni olish
router.get("/all", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server xatolik" });
  }
});

export default router;
