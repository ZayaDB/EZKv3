import mongoose from "mongoose";

const mentorApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      default: "",
    },
    introduction: {
      type: String,
      required: true,
    },
    hourlyRate: {
      type: Number,
      required: true,
      min: 10,
      max: 200,
    },
    languages: {
      type: String,
      required: true,
    },
    certifications: {
      type: String,
      default: "",
    },
    portfolio: {
      type: String,
      default: "",
    },
    motivation: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    adminNotes: {
      type: String,
      default: "",
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reviewedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("MentorApplication", mentorApplicationSchema);
