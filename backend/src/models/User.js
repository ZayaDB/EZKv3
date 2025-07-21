import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["student", "mentor", "admin"],
      default: "student",
    },
    // 멘토 정보 (role이 mentor일 때만 사용)
    mentorInfo: {
      specialization: String,
      experience: String,
      education: String,
      introduction: String,
      hourlyRate: Number,
      languages: String,
      certifications: String,
      portfolio: String,
      rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      totalSessions: {
        type: Number,
        default: 0,
      },
      isActive: {
        type: Boolean,
        default: true,
      },
    },
    // 학생 정보 (role이 student일 때만 사용)
    studentInfo: {
      totalSessions: {
        type: Number,
        default: 0,
      },
      completedSessions: {
        type: Number,
        default: 0,
      },
      averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      totalHours: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
