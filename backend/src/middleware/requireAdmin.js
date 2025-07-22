const requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "관리자 권한이 필요합니다.",
    });
  }
  next();
};

export default requireAdmin;
