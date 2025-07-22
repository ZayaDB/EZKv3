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

    // 모든 역할이 접근 가능하도록 수정
    // if (user.role !== "student") {
    //   return res.status(403).json({
    //     success: false,
    //     message: "학생만 접근할 수 있습니다.",
    //   });
    // }

    // 역할별 대시보드 데이터 구성
    let dashboardData = {
      totalSessions: 0,
      completedSessions: 0,
      upcomingSessions: 0,
      averageRating: 0,
      totalHours: 0,
      currentStreak: 0,
      nextSession: null,
      recentSessions: [],
      progress: {
        javascript: 0,
        react: 0,
        typescript: 0,
        nodejs: 0,
      },
      enrolledCourses: [],
      completedCourses: [],
    };

    // 학생인 경우 studentInfo에서 데이터 가져오기
    if (user.role === "student") {
      dashboardData = {
        ...dashboardData,
        totalSessions: user.studentInfo?.totalSessions || 0,
        completedSessions: user.studentInfo?.completedSessions || 0,
        averageRating: user.studentInfo?.averageRating || 0,
        totalHours: user.studentInfo?.totalHours || 0,
      };
    }

    // 멘토인 경우 mentorInfo에서 데이터 가져오기 (향후 확장)
    if (user.role === "mentor") {
      // 멘토용 데이터는 향후 구현
    }

    // 관리자인 경우 adminInfo에서 데이터 가져오기 (향후 확장)
    if (user.role === "admin") {
      // 관리자용 데이터는 향후 구현
    }

    res.json({
      success: true,
      data: dashboardData,
    });
  } catch (error) {
    console.error("대시보드 조회 오류:", error);
    res.status(500).json({
      success: false,
      message: "대시보드 데이터 조회에 실패했습니다.",
      error: error.message,
    });
  }
});

// 프로필 업데이트 (모든 역할)
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

    // 모든 역할이 접근 가능하도록 수정
    // if (user.role !== "student") {
    //   return res.status(403).json({
    //     success: false,
    //     message: "학생만 접근할 수 있습니다.",
    //   });
    // }

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
        mentorInfo: user.mentorInfo,
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
