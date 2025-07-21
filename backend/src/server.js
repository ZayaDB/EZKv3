import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// 미들웨어
app.use(cors());
app.use(express.json());

// 라우트
app.use("/api/auth", (await import("./routes/auth.js")).default);
app.use("/api/mentor", (await import("./routes/mentor.js")).default);
app.use("/api/course", (await import("./routes/course.js")).default);

// 기본 라우트
app.get("/", (req, res) => {
  res.json({ message: "EZKorea API is running!" });
});

// MongoDB 연결
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
