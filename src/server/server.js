import express from "express";
import path from "path";
import cors from "cors";
import connectDB from "./db.js";
import resumeRoutes from "./routes/resume.js";
import orderRoutes from "./routes/order.js";
<<<<<<< HEAD
import usersRoutes from "./routes/user.js";
=======
>>>>>>> 744f8b1935d50df70c25cc807ce57172e9e3c11b

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/resume", resumeRoutes);
app.use("/api/order", orderRoutes);
<<<<<<< HEAD
app.use("/api/user", usersRoutes);
=======
>>>>>>> 744f8b1935d50df70c25cc807ce57172e9e3c11b

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "dist")));

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT} portda ishlayapti`));
