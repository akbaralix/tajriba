import express from "express";
import Resume from "../models/Resume.js";

const router = express.Router();

// Create resume
router.post("/create", async (req, res) => {
  const { userId, kasb, bio, username, userpic, title } = req.body;

  if (!userId || !kasb || !bio) {
    return res.status(400).json({ message: "Barcha maydonlar majburiy" });
  }

  try {
    const newResume = new Resume({
      userId,
      kasb,
      bio,
      username,
      userpic,
      title,
    });

    await newResume.save();
    res.json({ message: "Resume saqlandi", resume: newResume });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server xatolik" });
  }
});

// Get all resumes
router.get("/all", async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.json({ resumes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server xatolik" });
  }
});
// Resume ko‘rildi → views +1
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const resume = await Resume.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } }, // views sonini oshirish
      { new: true } // yangilangan document qaytaradi
    );
    if (!resume) return res.status(404).json({ message: "Resume topilmadi" });
    res.json(resume);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server xatolik" });
  }
});

export default router;
