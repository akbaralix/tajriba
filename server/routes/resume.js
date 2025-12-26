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
// Resume o'chirish
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedResume = await Resume.findByIdAndDelete(id);
    if (!deletedResume) {
      return res.status(404).json({ message: "Resume topilmadi" });
    }
    res.json({ message: "Resume o‘chirildi", resume: deletedResume });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server xatolik" });
  }
});

export default router;
