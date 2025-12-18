import express from "express";
import connectDB from "./db.js";
import cors from "cors";
import resumeRoutes from "./routes/resume.js";
import orderRoutes from "./routes/order.js";

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Resume route
app.use("/api/resume", resumeRoutes);
app.use("/api/order", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT} portda ishlayapti`));
