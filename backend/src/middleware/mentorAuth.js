const mentorAuth = (req, res, next) => {
  if (req.user.role !== "mentor" && req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "멘토 권한이 필요합니다.",
    });
  }
  next();
};

export default mentorAuth;
