import express from "express";
import path from "path";
import cors from "cors";
import connectDB from "./db.js";
import resumeRoutes from "./routes/resume.js";
import orderRoutes from "./routes/order.js";

const app = express();

// MongoDB bilan ulanish
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/resume", resumeRoutes);
app.use("/api/order", orderRoutes);

// === FRONTEND STATIC FAYLLAR ===
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "dist")));

// Barcha GET so‘rovlarni dist/index.html ga yo‘naltirish
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT} portda ishlayapti`));
