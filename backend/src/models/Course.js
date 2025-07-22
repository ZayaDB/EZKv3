import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["programming", "design", "business", "language", "music", "other"],
    },
    level: {
      type: String,
      required: true,
      enum: ["beginner", "intermediate", "advanced"],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    duration: {
      type: Number, // 총 강의 시간 (분)
      required: true,
    },
    lessons: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
        },
        duration: {
          type: Number, // 분
          required: true,
        },
        videoUrl: {
          type: String,
        },
        materials: [
          {
            name: {
              type: String,
              required: true,
            },
            url: {
              type: String,
              required: true,
            },
            type: {
              type: String,
              enum: ["pdf", "video", "link", "other"],
            },
          },
        ],
      },
    ],
    thumbnail: {
      type: String,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: ["draft", "pending", "approved", "rejected"],
      default: "draft",
    },
    adminReview: {
      reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      reviewedAt: {
        type: Date,
      },
      notes: {
        type: String,
      },
    },
    enrollmentCount: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    language: {
      type: String,
      default: "ko",
      enum: ["ko", "en", "mn"],
    },
  },
  {
    timestamps: true,
  }
);

// 강의 검색을 위한 인덱스 (언어 관련 오류 방지를 위해 제거)
// courseSchema.index({ title: "text", description: "text", tags: "text" }, { default_language: "none" });

export default mongoose.model("Course", courseSchema);
