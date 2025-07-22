import express from "express";
import Course from "../models/Course.js";
import auth from "../middleware/auth.js";
import mentorAuth from "../middleware/mentorAuth.js";
import requireAdmin from "../middleware/requireAdmin.js";

const router = express.Router();

// 멘토가 강의 생성 (draft 상태로 생성)
router.post("/", auth, mentorAuth, async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      level,
      price,
      duration,
      lessons,
      thumbnail,
      tags,
      language,
    } = req.body;

    const course = new Course({
      title,
      description,
      mentor: req.user.id,
      category,
      level,
      price,
      duration,
      lessons: lessons || [],
      thumbnail,
      tags: tags || [],
      language: language || "ko",
      status: "draft", // 초기 상태는 draft
    });

    await course.save();
    await course.populate("mentor", "name email");

    res.status(201).json({
      success: true,
      message: "강의가 성공적으로 생성되었습니다. (초안 상태)",
      course,
    });
  } catch (error) {
    console.error("강의 생성 오류:", error);
    res.status(500).json({
      success: false,
      message: "강의 생성에 실패했습니다.",
      error: error.message,
    });
  }
});

// 멘토가 강의 제출 (draft → pending)
router.patch("/:id/submit", auth, mentorAuth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "강의를 찾을 수 없습니다.",
      });
    }

    // 강의 소유자 확인
    if (course.mentor.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "강의를 제출할 권한이 없습니다.",
      });
    }

    // draft 상태만 제출 가능
    if (course.status !== "draft") {
      return res.status(400).json({
        success: false,
        message: "초안 상태의 강의만 제출할 수 있습니다.",
      });
    }

    course.status = "pending";
    await course.save();

    res.json({
      success: true,
      message: "강의가 관리자 검토를 위해 제출되었습니다.",
      course,
    });
  } catch (error) {
    console.error("강의 제출 오류:", error);
    res.status(500).json({
      success: false,
      message: "강의 제출에 실패했습니다.",
      error: error.message,
    });
  }
});

// 관리자가 강의 승인/거절 (pending → approved/rejected)
router.patch("/:id/review", auth, requireAdmin, async (req, res) => {
  try {
    const { status, notes } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "유효하지 않은 상태입니다.",
      });
    }

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "강의를 찾을 수 없습니다.",
      });
    }

    // pending 상태만 검토 가능
    if (course.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "검토 대기 상태의 강의만 처리할 수 있습니다.",
      });
    }

    course.status = status;
    course.adminReview = {
      reviewedBy: req.user.id,
      reviewedAt: new Date(),
      notes: notes || "",
    };

    await course.save();
    await course.populate("mentor", "name email");

    res.json({
      success: true,
      message:
        status === "approved"
          ? "강의가 승인되었습니다."
          : "강의가 거절되었습니다.",
      course,
    });
  } catch (error) {
    console.error("강의 검토 오류:", error);
    res.status(500).json({
      success: false,
      message: "강의 검토에 실패했습니다.",
      error: error.message,
    });
  }
});

// 관리자가 모든 강의 목록 조회 (상태별 필터링)
router.get("/admin/all", auth, requireAdmin, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const query = {};
    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;

    const courses = await Course.find(query)
      .populate("mentor", "name email")
      .populate("adminReview.reviewedBy", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Course.countDocuments(query);

    res.json({
      success: true,
      courses,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalCourses: total,
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("관리자 강의 목록 조회 오류:", error);
    res.status(500).json({
      success: false,
      message: "강의 목록 조회에 실패했습니다.",
      error: error.message,
    });
  }
});

// 멘토의 강의 목록 조회 (상태별)
router.get("/my-courses", auth, mentorAuth, async (req, res) => {
  try {
    const { status } = req.query;

    const query = { mentor: req.user.id };
    if (status) {
      query.status = status;
    }

    const courses = await Course.find(query)
      .populate("mentor", "name email")
      .populate("adminReview.reviewedBy", "name")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      courses,
    });
  } catch (error) {
    console.error("강의 목록 조회 오류:", error);
    res.status(500).json({
      success: false,
      message: "강의 목록 조회에 실패했습니다.",
      error: error.message,
    });
  }
});

// 특정 강의 조회 (승인된 강의만 공개)
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "mentor",
      "name email mentorInfo"
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "강의를 찾을 수 없습니다.",
      });
    }

    // 승인된 강의만 공개 조회 가능 (관리자 제외)
    if (course.status !== "approved") {
      return res.status(403).json({
        success: false,
        message: "승인되지 않은 강의입니다.",
      });
    }

    res.json({
      success: true,
      course,
    });
  } catch (error) {
    console.error("강의 조회 오류:", error);
    res.status(500).json({
      success: false,
      message: "강의 조회에 실패했습니다.",
      error: error.message,
    });
  }
});

// 강의 수정 (draft 상태만 수정 가능)
router.put("/:id", auth, mentorAuth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "강의를 찾을 수 없습니다.",
      });
    }

    // 강의 소유자 확인
    if (course.mentor.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "강의를 수정할 권한이 없습니다.",
      });
    }

    // draft 상태만 수정 가능
    if (course.status !== "draft") {
      return res.status(400).json({
        success: false,
        message: "초안 상태의 강의만 수정할 수 있습니다.",
      });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("mentor", "name email");

    res.json({
      success: true,
      message: "강의가 성공적으로 수정되었습니다.",
      course: updatedCourse,
    });
  } catch (error) {
    console.error("강의 수정 오류:", error);
    res.status(500).json({
      success: false,
      message: "강의 수정에 실패했습니다.",
      error: error.message,
    });
  }
});

// 강의 삭제 (draft 상태만 삭제 가능)
router.delete("/:id", auth, mentorAuth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "강의를 찾을 수 없습니다.",
      });
    }

    // 강의 소유자 확인
    if (course.mentor.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "강의를 삭제할 권한이 없습니다.",
      });
    }

    // draft 상태만 삭제 가능
    if (course.status !== "draft") {
      return res.status(400).json({
        success: false,
        message: "초안 상태의 강의만 삭제할 수 있습니다.",
      });
    }

    await Course.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "강의가 성공적으로 삭제되었습니다.",
    });
  } catch (error) {
    console.error("강의 삭제 오류:", error);
    res.status(500).json({
      success: false,
      message: "강의 삭제에 실패했습니다.",
      error: error.message,
    });
  }
});

// 공개 강의 목록 조회 (승인된 강의만)
router.get("/", async (req, res) => {
  try {
    const {
      search,
      category,
      level,
      language,
      minPrice,
      maxPrice,
      sortBy = "createdAt",
      order = "desc",
      page = 1,
      limit = 12,
    } = req.query;

    const query = { status: "approved" }; // 승인된 강의만

    // 검색
    if (search) {
      query.$text = { $search: search };
    }

    // 카테고리 필터
    if (category) {
      query.category = category;
    }

    // 레벨 필터
    if (level) {
      query.level = level;
    }

    // 언어 필터
    if (language) {
      query.language = language;
    }

    // 가격 필터
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const sortOptions = {};
    sortOptions[sortBy] = order === "desc" ? -1 : 1;

    const skip = (page - 1) * limit;

    const courses = await Course.find(query)
      .populate("mentor", "name email mentorInfo")
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    const total = await Course.countDocuments(query);

    res.json({
      success: true,
      courses,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalCourses: total,
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("강의 목록 조회 오류:", error);
    res.status(500).json({
      success: false,
      message: "강의 목록 조회에 실패했습니다.",
      error: error.message,
    });
  }
});

export default router;
