import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// JWT 미들웨어
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET || "your-secret-key",
    (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      req.user = user;
      next();
    }
  );
};

// 회원가입
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role = "student" } = req.body;

    // 이메일 중복 확인
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "이미 존재하는 이메일입니다.",
      });
    }

    // 비밀번호 해시화
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 사용자 생성
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    // JWT 토큰 생성
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      message: "회원가입이 완료되었습니다.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("회원가입 오류:", error);
    res.status(500).json({
      success: false,
      message: "회원가입에 실패했습니다.",
      error: error.message,
    });
  }
});

// 로그인
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 사용자 찾기
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "이메일 또는 비밀번호가 올바르지 않습니다.",
      });
    }

    // 비밀번호 확인
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "이메일 또는 비밀번호가 올바르지 않습니다.",
      });
    }

    // JWT 토큰 생성
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "로그인이 완료되었습니다.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        mentorInfo: user.mentorInfo,
        studentInfo: user.studentInfo,
      },
    });
  } catch (error) {
    console.error("로그인 오류:", error);
    res.status(500).json({
      success: false,
      message: "로그인에 실패했습니다.",
      error: error.message,
    });
  }
});

// 임시 관리자 계정 생성 (개발용)
router.post("/create-admin", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 이메일 중복 확인
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "이미 존재하는 이메일입니다.",
      });
    }

    // 비밀번호 해시화
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 관리자 사용자 생성
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "관리자 계정이 생성되었습니다.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("관리자 계정 생성 오류:", error);
    res.status(500).json({
      success: false,
      message: "관리자 계정 생성에 실패했습니다.",
      error: error.message,
    });
  }
});

// 프로필 업데이트
router.put("/profile", authenticateToken, async (req, res) => {
  try {
    const { name, profileImage } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "사용자를 찾을 수 없습니다.",
      });
    }

    // 업데이트할 필드들
    if (name) user.name = name;
    if (profileImage !== undefined) user.profileImage = profileImage;

    await user.save();

    res.json({
      success: true,
      message: "프로필이 업데이트되었습니다.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        mentorInfo: user.mentorInfo,
        studentInfo: user.studentInfo,
      },
    });
  } catch (error) {
    console.error("프로필 업데이트 오류:", error);
    res.status(500).json({
      success: false,
      message: "프로필 업데이트에 실패했습니다.",
      error: error.message,
    });
  }
});

export default router;
