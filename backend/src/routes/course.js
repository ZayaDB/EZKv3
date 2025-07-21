import express from "express";
import Course from "../models/Course.js";
import auth from "../middleware/auth.js";
import mentorAuth from "../middleware/mentorAuth.js";

const router = express.Router();

// 멘토가 강의 생성
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
    });

    await course.save();
    await course.populate("mentor", "name email");

    res.status(201).json({
      success: true,
      message: "강의가 성공적으로 생성되었습니다.",
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

// 멘토의 강의 목록 조회
router.get("/my-courses", auth, mentorAuth, async (req, res) => {
  try {
    const courses = await Course.find({ mentor: req.user.id })
      .populate("mentor", "name email")
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

// 특정 강의 조회
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

// 강의 수정
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

// 강의 삭제
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

// 강의 발행/비발행 토글
router.patch("/:id/publish", auth, mentorAuth, async (req, res) => {
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

    course.isPublished = !course.isPublished;
    await course.save();

    res.json({
      success: true,
      message: course.isPublished
        ? "강의가 발행되었습니다."
        : "강의가 비발행되었습니다.",
      course,
    });
  } catch (error) {
    console.error("강의 발행 토글 오류:", error);
    res.status(500).json({
      success: false,
      message: "강의 발행 상태 변경에 실패했습니다.",
      error: error.message,
    });
  }
});

// 공개 강의 목록 조회 (검색, 필터링 포함)
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

    const query = { isPublished: true };

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
