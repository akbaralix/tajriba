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

export default router;
