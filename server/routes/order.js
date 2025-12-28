import express from "express";
import Order from "../models/Order.js"; // To'g'ri model

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

// Buyurtma tafsilotini olish va ko'rishlar sonini oshirish
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { increment } = req.query;

    let order;
    if (increment === "true") {
      order = await Order.findByIdAndUpdate(
        id,
        { $inc: { views: 1 } },
        { new: true }
      );
    } else {
      order = await Order.findById(id);
    }

    if (!order) return res.status(404).json({ message: "Buyurtma topilmadi" });
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server xatosi" });
  }
});

export default router;
