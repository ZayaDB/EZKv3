import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

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

// 학생 대시보드 데이터 조회
router.get("/dashboard", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // 사용자 정보 조회
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "사용자를 찾을 수 없습니다.",
      });
    }

    // 학생 정보 확인
    if (user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "학생만 접근할 수 있습니다.",
      });
    }

    // 학생 통계 데이터
    const dashboardData = {
      totalSessions: user.studentInfo?.totalSessions || 0,
      completedSessions: user.studentInfo?.completedSessions || 0,
      upcomingSessions: 0, // 향후 세션 예약 시스템에서 가져올 예정
      averageRating: user.studentInfo?.averageRating || 0,
      totalHours: user.studentInfo?.totalHours || 0,
      currentStreak: 0, // 향후 연속 학습 시스템에서 가져올 예정
      nextSession: null, // 향후 세션 예약 시스템에서 가져올 예정
      recentSessions: [], // 향후 세션 히스토리에서 가져올 예정
      progress: {
        // 향후 학습 진행률 시스템에서 가져올 예정
        javascript: 0,
        react: 0,
        typescript: 0,
        nodejs: 0,
      },
      enrolledCourses: [], // 수강 중인 강의 목록
      completedCourses: [], // 완료한 강의 목록
    };

    res.json({
      success: true,
      data: dashboardData,
    });
  } catch (error) {
    console.error("학생 대시보드 조회 오류:", error);
    res.status(500).json({
      success: false,
      message: "대시보드 데이터 조회에 실패했습니다.",
      error: error.message,
    });
  }
});

// 학생 프로필 업데이트
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

    // 학생만 접근 가능
    if (user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "학생만 접근할 수 있습니다.",
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
        studentInfo: user.studentInfo,
      },
    });
  } catch (error) {
    console.error("학생 프로필 업데이트 오류:", error);
    res.status(500).json({
      success: false,
      message: "프로필 업데이트에 실패했습니다.",
      error: error.message,
    });
  }
});

export default router;
