import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Foydalanuvchini saqlash yoki yangilash
router.post("/login", async (req, res) => {
  const { uid, name, email, photo } = req.body;
  try {
    const existingUser = await User.findOne({ uid });

    if (existingUser) {
      // mavjud bo‘lsa yangilash
      existingUser.name = name;
      existingUser.email = email;
      existingUser.photo = photo;
      await existingUser.save();
      return res.json(existingUser);
    }

    // yangi user yaratish
    const newUser = new User({ uid, name, email, photo });
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server xatolik" });
  }
});

export default router;
