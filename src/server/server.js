import express from "express";
import connectDB from "./db.js";
import cors from "cors";
import resumeRoutes from "./routes/resume.js";

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API ishlayapti 🚀");
});

app.use("/api/resume", resumeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server ${PORT} portda ishlayapti`)
);
