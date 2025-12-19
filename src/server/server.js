import express from "express";
import path from "path";
import cors from "cors";
import connectDB from "./db.js";
import resumeRoutes from "./routes/resume.js";
import orderRoutes from "./routes/order.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/resume", resumeRoutes);
app.use("/api/order", orderRoutes);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "dist")));

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT} portda ishlayapti`));
