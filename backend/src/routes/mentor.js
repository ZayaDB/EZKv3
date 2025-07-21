import express from "express";
import MentorApplication from "../models/MentorApplication.js";
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

// 관리자 권한 확인 미들웨어
const requireAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    req.currentUser = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 멘토 신청 제출
router.post("/apply", authenticateToken, async (req, res) => {
  try {
    const {
      specialization,
      experience,
      education,
      introduction,
      hourlyRate,
      languages,
      certifications,
      portfolio,
      motivation,
    } = req.body;

    // 이미 신청한 적이 있는지 확인
    const existingApplication = await MentorApplication.findOne({
      userId: req.user.userId,
      status: { $in: ["pending", "approved"] },
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You already have a pending or approved application",
      });
    }

    // 새 신청서 생성
    const application = new MentorApplication({
      userId: req.user.userId,
      specialization,
      experience,
      education,
      introduction,
      hourlyRate: Number(hourlyRate),
      languages,
      certifications,
      portfolio,
      motivation,
    });

    await application.save();

    res.status(201).json({
      message: "Mentor application submitted successfully",
      applicationId: application._id,
    });
  } catch (error) {
    console.error("Mentor application error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 사용자의 멘토 신청 상태 확인
router.get("/my-application", authenticateToken, async (req, res) => {
  try {
    const application = await MentorApplication.findOne({
      userId: req.user.userId,
    }).sort({ createdAt: -1 });

    if (!application) {
      return res.status(404).json({ message: "No application found" });
    }

    res.json(application);
  } catch (error) {
    console.error("Get application error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 관리자: 모든 멘토 신청 조회
router.get(
  "/applications",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const { status, page = 1, limit = 10 } = req.query;

      const query = {};
      if (status) {
        query.status = status;
      }

      const applications = await MentorApplication.find(query)
        .populate("userId", "name email")
        .populate("reviewedBy", "name")
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await MentorApplication.countDocuments(query);

      res.json({
        applications,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total,
      });
    } catch (error) {
      console.error("Get applications error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// 관리자: 멘토 신청 승인/거절
router.put(
  "/applications/:id/review",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const { status, adminNotes } = req.body;
      const { id } = req.params;

      if (!["approved", "rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      const application = await MentorApplication.findById(id);
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }

      if (application.status !== "pending") {
        return res
          .status(400)
          .json({ message: "Application already reviewed" });
      }

      // 신청서 상태 업데이트
      application.status = status;
      application.adminNotes = adminNotes || "";
      application.reviewedBy = req.user.userId;
      application.reviewedAt = new Date();

      await application.save();

      // 승인된 경우 사용자를 멘토로 변경
      if (status === "approved") {
        const user = await User.findById(application.userId);
        if (user) {
          user.role = "mentor";
          user.mentorInfo = {
            specialization: application.specialization,
            experience: application.experience,
            education: application.education,
            introduction: application.introduction,
            hourlyRate: application.hourlyRate,
            languages: application.languages,
            certifications: application.certifications,
            portfolio: application.portfolio,
          };
          await user.save();
        }
      }

      res.json({
        message: `Application ${status} successfully`,
        application,
      });
    } catch (error) {
      console.error("Review application error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// 관리자: 멘토 목록 조회
router.get("/mentors", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const mentors = await User.find({ role: "mentor" })
      .select("name email mentorInfo createdAt")
      .sort({ createdAt: -1 });

    res.json(mentors);
  } catch (error) {
    console.error("Get mentors error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 승인된 멘토 목록 조회
router.get("/approved", async (req, res) => {
  try {
    const {
      search,
      specialization,
      language,
      minPrice,
      maxPrice,
      sortBy = "rating",
      order = "desc",
    } = req.query;

    const query = { role: "mentor" };

    // 검색
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { "mentorInfo.specialization": { $regex: search, $options: "i" } },
        { "mentorInfo.introduction": { $regex: search, $options: "i" } },
      ];
    }

    // 전문분야 필터
    if (specialization) {
      query["mentorInfo.specialization"] = specialization;
    }

    // 언어 필터
    if (language) {
      query["mentorInfo.languages"] = { $regex: language, $options: "i" };
    }

    // 가격 필터
    if (minPrice || maxPrice) {
      query["mentorInfo.hourlyRate"] = {};
      if (minPrice) query["mentorInfo.hourlyRate"].$gte = Number(minPrice);
      if (maxPrice) query["mentorInfo.hourlyRate"].$lte = Number(maxPrice);
    }

    const sortOptions = {};
    sortOptions[sortBy] = order === "desc" ? -1 : 1;

    const mentors = await User.find(query)
      .select("name email mentorInfo")
      .sort(sortOptions)
      .limit(50);

    res.json({
      success: true,
      mentors,
    });
  } catch (error) {
    console.error("승인된 멘토 목록 조회 오류:", error);
    res.status(500).json({
      success: false,
      message: "멘토 목록 조회에 실패했습니다.",
      error: error.message,
    });
  }
});

export default router;
