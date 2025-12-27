import express from "express";
import Resume from "../models/Resume.js";

const router = express.Router();

// Resume yaratish
router.post("/create", async (req, res) => {
  const { userId, kasb, bio, tguser, username, userpic } = req.body;
  try {
    const newResume = new Resume({
      userId,
      kasb,
      bio,
      tguser,
      username,
      userpic,
    });
    await newResume.save();
    res.json({ message: "Resume saqlandi", resume: newResume });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server xatolik" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.json({ resumes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server xatolik" });
  }
});
// Resume ko‘rildi → views +1
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { increment } = req.query; // ?increment=true qismini tutib olish

    let resume;
    if (increment === "true") {
      // Views-ni oshirish va ma'lumotni qaytarish
      resume = await Resume.findByIdAndUpdate(
        id,
        { $inc: { views: 1 } },
        { new: true }
      );
    } else {
      // Shunchaki ma'lumotni o'zini olish
      resume = await Resume.findById(id);
    }

    if (!resume) return res.status(404).json({ message: "Topilmadi" });
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi" });
  }
});

export default router;
