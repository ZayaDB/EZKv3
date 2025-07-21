import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaGraduationCap,
  FaClock,
  FaCheck,
  FaTimes,
  FaEye,
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

const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<MentorApplication[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("applications");
  const [selectedApplication, setSelectedApplication] =
    useState<MentorApplication | null>(null);
  const [reviewModal, setReviewModal] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");

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

      const [applicationsRes, mentorsRes] = await Promise.all([
        axios.get(
          "https://ezkv3-production.up.railway.app/api/mentor/applications",
          { headers }
        ),
        axios.get(
          "https://ezkv3-production.up.railway.app/api/mentor/mentors",
          { headers }
        ),
      ]);

      setApplications(applicationsRes.data.applications || []);
      setMentors(mentorsRes.data || []);
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

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; text: string }> = {
      pending: { color: "bg-yellow-100 text-yellow-800", text: "대기중" },
      approved: { color: "bg-green-100 text-green-800", text: "승인됨" },
      rejected: { color: "bg-red-100 text-red-800", text: "거절됨" },
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.text}
      </span>
    );
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
            멘토 신청 관리 및 사용자 관리
          </p>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                  총 신청
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {applications.length}
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

      {/* 리뷰 모달 */}
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
    </div>
  );
};

export default AdminDashboard;
