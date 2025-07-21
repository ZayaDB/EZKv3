import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// 회원가입
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // 이메일 중복 확인
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "이미 존재하는 이메일입니다." });
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 12);

    // 새 사용자 생성
    const user = new User({
      email,
      password: hashedPassword,
      name,
    });

    await user.save();

    res.status(201).json({ message: "회원가입이 완료되었습니다." });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

// 로그인
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 사용자 찾기
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "이메일 또는 비밀번호가 잘못되었습니다." });
    }

    // 비밀번호 확인
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "이메일 또는 비밀번호가 잘못되었습니다." });
    }

    // JWT 토큰 생성
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );

    res.json({
      message: "로그인이 완료되었습니다.",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

export default router;
