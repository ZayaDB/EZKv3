const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 미들웨어
app.use(cors());
app.use(express.json());

// 라우트
app.use("/api/auth", require("./routes/auth"));
app.use("/api/mentor", require("./routes/mentor"));
app.use("/api/course", require("./routes/course"));

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
