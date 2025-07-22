import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaGraduationCap,
  FaClock,
  FaCheck,
  FaTimes,
  FaEye,
  FaBook,
} from "react-icons/fa";
import axios from "axios";

interface MentorApplication {
  _id: string;
  userId: {
    name: string;
    email: string;
  };
  specialization: string;
  experience: string;
  introduction: string;
  motivation: string;
  hourlyRate: number;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

interface Mentor {
  _id: string;
  name: string;
  email: string;
  mentorInfo: {
    specialization: string;
    hourlyRate: number;
    languages: string;
  };
}

interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  price: number;
  duration: number;
  status: "draft" | "pending" | "approved" | "rejected";
  mentor: {
    name: string;
    email: string;
  };
  adminReview?: {
    reviewedBy: {
      name: string;
    };
    reviewedAt: string;
    notes: string;
  };
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<MentorApplication[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("applications");
  const [selectedApplication, setSelectedApplication] =
    useState<MentorApplication | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [reviewModal, setReviewModal] = useState(false);
  const [courseReviewModal, setCourseReviewModal] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [courseAdminNotes, setCourseAdminNotes] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!token || user.role !== "admin") {
      navigate("/dashboard");
      return;
    }

    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const [applicationsRes, mentorsRes, coursesRes] = await Promise.all([
        axios.get(
          "https://ezkv3-production.up.railway.app/api/mentor/applications",
          { headers }
        ),
        axios.get(
          "https://ezkv3-production.up.railway.app/api/mentor/mentors",
          { headers }
        ),
        axios.get(
          "https://ezkv3-production.up.railway.app/api/course/admin/all",
          { headers }
        ),
      ]);

      setApplications(applicationsRes.data.applications || []);
      setMentors(mentorsRes.data || []);
      setCourses(coursesRes.data.courses || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleReview = async (status: "approved" | "rejected") => {
    if (!selectedApplication) return;

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://ezkv3-production.up.railway.app/api/mentor/applications/${selectedApplication._id}/review`,
        { status, adminNotes },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setReviewModal(false);
      setSelectedApplication(null);
      setAdminNotes("");
      fetchData(); // 데이터 새로고침
    } catch (error) {
      console.error("Error reviewing application:", error);
    }
  };

  const handleCourseReview = async (status: "approved" | "rejected") => {
    if (!selectedCourse) return;

    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      console.log("Current user:", user);
      console.log("User role:", user.role);
      console.log("Reviewing course:", selectedCourse._id, "Status:", status);
      console.log("Course current status:", selectedCourse.status);
      console.log("Request payload:", { status, notes: courseAdminNotes });

      const response = await axios.patch(
        `https://ezkv3-production.up.railway.app/api/course/${selectedCourse._id}/review`,
        { status, notes: courseAdminNotes },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        alert(
          status === "approved"
            ? "강의가 성공적으로 승인되었습니다!"
            : "강의가 거절되었습니다."
        );
        setCourseReviewModal(false);
        setSelectedCourse(null);
        setCourseAdminNotes("");
        fetchData(); // 데이터 새로고침
      } else {
        alert(response.data.message || "강의 검토에 실패했습니다.");
      }
    } catch (error: any) {
      console.error("Error reviewing course:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      alert(
        error.response?.data?.message || "강의 검토 중 오류가 발생했습니다."
      );
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; text: string }> = {
      draft: {
        color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
        text: "초안",
      },
      pending: {
        color:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
        text: "검토 대기",
      },
      approved: {
        color:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        text: "승인됨",
      },
      rejected: {
        color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
        text: "거절됨",
      },
    };
    const config = statusConfig[status] || statusConfig.draft;
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.text}
      </span>
    );
  };

  const getCategoryLabel = (category: string) => {
    const categories: Record<string, string> = {
      programming: "프로그래밍",
      design: "디자인",
      business: "비즈니스",
      language: "언어",
      music: "음악",
      other: "기타",
    };
    return categories[category] || category;
  };

  const getLevelLabel = (level: string) => {
    const levels: Record<string, string> = {
      beginner: "초급",
      intermediate: "중급",
      advanced: "고급",
    };
    return levels[level] || level;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            관리자 대시보드
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            멘토 신청 관리, 강의 승인 및 사용자 관리
          </p>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  대기중 신청
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {
                    applications.filter((app) => app.status === "pending")
                      .length
                  }
                </p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <FaClock className="text-yellow-600 dark:text-yellow-400 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  대기중 강의
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {
                    courses.filter((course) => course.status === "pending")
                      .length
                  }
                </p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <FaBook className="text-orange-600 dark:text-orange-400 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  총 멘토
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {mentors.length}
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <FaGraduationCap className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  총 강의
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {courses.length}
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <FaUsers className="text-purple-600 dark:text-purple-400 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab("applications")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "applications"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              멘토 신청 관리
            </button>
            <button
              onClick={() => setActiveTab("courses")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "courses"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              강의 승인 관리
            </button>
            <button
              onClick={() => setActiveTab("mentors")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "mentors"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              멘토 목록
            </button>
          </div>
        </div>

        {/* 멘토 신청 관리 */}
        {activeTab === "applications" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                멘토 신청 목록
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                        신청자
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                        전문분야
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                        경력
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                        시급
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                        상태
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                        신청일
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                        액션
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <tr
                        key={app._id}
                        className="border-b border-gray-100 dark:border-gray-700"
                      >
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {app.userId?.name || "Unknown"}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {app.userId?.email || "No email"}
                            </p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-900 dark:text-white">
                          {app.specialization}
                        </td>
                        <td className="py-3 px-4 text-gray-900 dark:text-white">
                          {app.experience}
                        </td>
                        <td className="py-3 px-4 text-gray-900 dark:text-white">
                          ${app.hourlyRate}/hr
                        </td>
                        <td className="py-3 px-4">
                          {getStatusBadge(app.status)}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setSelectedApplication(app);
                                setReviewModal(true);
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <FaEye />
                            </button>
                            {app.status === "pending" && (
                              <>
                                <button
                                  onClick={() => handleReview("approved")}
                                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                >
                                  <FaCheck />
                                </button>
                                <button
                                  onClick={() => handleReview("rejected")}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  <FaTimes />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 강의 승인 관리 */}
        {activeTab === "courses" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                강의 승인 관리
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                        강의명
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                        멘토
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                        카테고리
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                        가격
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                        상태
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                        생성일
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                        액션
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => (
                      <tr
                        key={course._id}
                        className="border-b border-gray-100 dark:border-gray-700"
                      >
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {course.title}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {course.description.substring(0, 50)}...
                            </p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {course.mentor?.name || "Unknown"}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {course.mentor?.email || "No email"}
                            </p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-900 dark:text-white">
                          {getCategoryLabel(course.category)}
                        </td>
                        <td className="py-3 px-4 text-gray-900 dark:text-white">
                          {course.price.toLocaleString()}원
                        </td>
                        <td className="py-3 px-4">
                          {getStatusBadge(course.status)}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                          {new Date(course.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setSelectedCourse(course);
                                setCourseReviewModal(true);
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <FaEye />
                            </button>
                            {course.status === "pending" && (
                              <>
                                <button
                                  onClick={() => {
                                    setSelectedCourse(course);
                                    handleCourseReview("approved");
                                  }}
                                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                  title="강의 승인"
                                >
                                  <FaCheck />
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedCourse(course);
                                    handleCourseReview("rejected");
                                  }}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="강의 거절"
                                >
                                  <FaTimes />
                                </button>
                              </>
                            )}
                            {course.status === "draft" && (
                              <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                                제출 대기
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 멘토 목록 */}
        {activeTab === "mentors" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                멘토 목록
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mentors.map((mentor) => (
                  <div
                    key={mentor._id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <FaGraduationCap className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {mentor.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {mentor.email}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">전문분야:</span>{" "}
                        {mentor.mentorInfo?.specialization}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">시급:</span> $
                        {mentor.mentorInfo?.hourlyRate}/hr
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">언어:</span>{" "}
                        {mentor.mentorInfo?.languages}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 멘토 신청 리뷰 모달 */}
      {reviewModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              멘토 신청 검토
            </h3>

            <div className="space-y-4 mb-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  신청자 정보
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  이름: {selectedApplication.userId?.name}
                  <br />
                  이메일: {selectedApplication.userId?.email}
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  전문분야
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedApplication.specialization}
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  자기소개
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedApplication.introduction}
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  멘토링 동기
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedApplication.motivation}
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  관리자 메모
                </h4>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows={3}
                  placeholder="검토 메모를 입력하세요..."
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleReview("approved")}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                승인
              </button>
              <button
                onClick={() => handleReview("rejected")}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                거절
              </button>
              <button
                onClick={() => setReviewModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 강의 리뷰 모달 */}
      {courseReviewModal && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              강의 검토
            </h3>

            <div className="space-y-4 mb-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  강의 정보
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  제목: {selectedCourse.title}
                  <br />
                  멘토: {selectedCourse.mentor?.name} (
                  {selectedCourse.mentor?.email})
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  강의 설명
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedCourse.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    카테고리
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {getCategoryLabel(selectedCourse.category)}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    난이도
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {getLevelLabel(selectedCourse.level)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    가격
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedCourse.price.toLocaleString()}원
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    총 강의 시간
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedCourse.duration}분
                  </p>
                </div>
              </div>

              {selectedCourse.adminReview && (
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    이전 검토 정보
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    검토자: {selectedCourse.adminReview.reviewedBy?.name}
                    <br />
                    검토일:{" "}
                    {new Date(
                      selectedCourse.adminReview.reviewedAt
                    ).toLocaleDateString()}
                    <br />
                    메모: {selectedCourse.adminReview.notes}
                  </p>
                </div>
              )}

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  관리자 메모
                </h4>
                <textarea
                  value={courseAdminNotes}
                  onChange={(e) => setCourseAdminNotes(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows={3}
                  placeholder="검토 메모를 입력하세요..."
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleCourseReview("approved")}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                승인
              </button>
              <button
                onClick={() => handleCourseReview("rejected")}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                거절
              </button>
              <button
                onClick={() => setCourseReviewModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
