import express from "express";
import connectDB from "./db.js";
import cors from "cors";
import resumeRoutes from "./routes/resume.js"; // shu fayl bo'lishi kerak

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Resume route
app.use("/api/resume", resumeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT} portda ishlayapti`));
