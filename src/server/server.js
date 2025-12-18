import express from "express";
import connectDB from "./db.js";
import cors from "cors";
import resumeRoutes from "./routes/resume.js";
import orderRoutes from "./routes/order.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== FRONTEND (ROOT index.html) =====
app.use(express.static(path.join(__dirname, "../../")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../index.html"));
});

// ===== API =====
app.use("/api/resume", resumeRoutes);
app.use("/api/order", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT} portda ishlayapti`));
