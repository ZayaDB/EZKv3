import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  FaGraduationCap,
  FaCalendarAlt,
  FaStar,
  FaClock,
  FaBook,
  FaChartLine,
  FaBell,
  FaCheck,
  FaChalkboardTeacher,
  FaEdit,
  FaTimes,
} from "react-icons/fa";

interface DashboardData {
  totalSessions: number;
  completedSessions: number;
  upcomingSessions: number;
  averageRating: number;
  totalHours: number;
  currentStreak: number;
  nextSession: {
    date: string;
    time: string;
    mentor: string;
    subject: string;
  } | null;
  recentSessions: Array<{
    date: string;
    mentor: string;
    subject: string;
    rating: number;
  }>;
  progress: {
    javascript: number;
    react: number;
    typescript: number;
    nodejs: number;
  };
  enrolledCourses: Array<{
    _id: string;
    title: string;
    progress: number;
    thumbnail?: string;
  }>;
  completedCourses: Array<{
    _id: string;
    title: string;
    completedAt: string;
    thumbnail?: string;
  }>;
}

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setEditName(parsedUser.name);
      fetchDashboardData();
    }
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://ezkv3-production.up.railway.app/api/student/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setDashboardData(data.data);
      } else {
        setError(data.message || "대시보드 데이터를 불러올 수 없습니다.");
      }
    } catch (error) {
      console.error("대시보드 데이터 조회 오류:", error);
      setError("대시보드 데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://ezkv3-production.up.railway.app/api/student/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: editName,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // 로컬 스토리지 업데이트
        const updatedUser = { ...user, name: editName };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setShowProfileEdit(false);

        // 페이지 새로고침 이벤트 발생
        window.dispatchEvent(new Event("loginStateChanged"));
      } else {
        alert(data.message || "프로필 업데이트에 실패했습니다.");
      }
    } catch (error) {
      console.error("프로필 업데이트 오류:", error);
      alert("프로필 업데이트 중 오류가 발생했습니다.");
    }
  };

  const switchToMentorMode = () => {
    navigate("/mentor-dashboard");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            오류가 발생했습니다
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 섹션 */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center overflow-hidden">
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaGraduationCap className="text-blue-600 dark:text-blue-400 text-2xl" />
                )}
              </div>
              <div>
                {showProfileEdit ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="text-3xl font-bold text-gray-900 dark:text-white bg-transparent border-b-2 border-blue-500 focus:outline-none"
                    />
                    <button
                      onClick={handleProfileUpdate}
                      className="p-1 text-green-600 hover:text-green-700"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileEdit(false);
                        setEditName(user.name);
                      }}
                      className="p-1 text-red-600 hover:text-red-700"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {t("welcome")}, {user?.name}님! 👋
                    </h1>
                    <button
                      onClick={() => setShowProfileEdit(true)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <FaEdit />
                    </button>
                  </div>
                )}
                <p className="text-gray-600 dark:text-gray-400">
                  {t("welcomeMessage")}
                </p>
              </div>
            </div>
            {/* 멘토인 경우 멘토 대시보드로 돌아가는 버튼 표시 */}
            {user?.role === "mentor" && (
              <button
                onClick={switchToMentorMode}
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <FaChalkboardTeacher />
                {t("switchToMentorMode")}
              </button>
            )}
          </div>
        </div>

        {/* 통계 카드 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t("totalSessions")}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {dashboardData?.totalSessions || 0}
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
                  {t("completedSessions")}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {dashboardData?.completedSessions || 0}
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <FaCheck className="text-green-600 dark:text-green-400 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t("averageRating")}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {dashboardData?.averageRating || 0}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <FaStar className="text-yellow-600 dark:text-yellow-400 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t("totalHours")}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {dashboardData?.totalHours || 0}h
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <FaClock className="text-purple-600 dark:text-purple-400 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* 메인 콘텐츠 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 다음 세션 */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t("nextSession")}
                </h2>
                <FaCalendarAlt className="text-blue-600 dark:text-blue-400" />
              </div>
              {(dashboardData?.upcomingSessions || 0) > 0 &&
              dashboardData?.nextSession ? (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {dashboardData.nextSession.subject}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {t("mentor")}: {dashboardData.nextSession.mentor}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {dashboardData.nextSession.date}{" "}
                        {dashboardData.nextSession.time}
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      {t("joinSession")}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FaCalendarAlt className="text-gray-400 text-4xl mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    {t("noUpcomingSessions")}
                  </p>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    {t("findMentor")}
                  </button>
                </div>
              )}
            </div>

            {/* 수강 중인 강의 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                수강 중인 강의
              </h2>
              {dashboardData?.enrolledCourses &&
              dashboardData.enrolledCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dashboardData.enrolledCourses.map((course) => (
                    <div
                      key={course._id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => navigate(`/course/${course._id}`)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                          {course.thumbnail ? (
                            <img
                              src={course.thumbnail}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <FaBook className="text-gray-400 dark:text-gray-600" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                            {course.title}
                          </h3>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {course.progress}% 완료
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FaBook className="text-gray-400 text-4xl mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    수강 중인 강의가 없습니다
                  </p>
                  <button
                    onClick={() => navigate("/courses")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    강의 찾기
                  </button>
                </div>
              )}
            </div>

            {/* 최근 세션 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t("recentSessions")}
              </h2>
              {dashboardData?.recentSessions &&
              dashboardData.recentSessions.length > 0 ? (
                <div className="space-y-4">
                  {dashboardData.recentSessions.map((session, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {session.subject}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {session.mentor} • {session.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`text-sm ${
                                i < session.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300 dark:text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FaClock className="text-gray-400 text-4xl mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    최근 세션이 없습니다
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 학습 진행률 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t("learningProgress")}
              </h2>
              <div className="space-y-4">
                {Object.entries(dashboardData?.progress || {}).map(
                  ([skill, progress]) => (
                    <div key={skill}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                          {skill}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* 빠른 액션 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t("quickActions")}
              </h2>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 text-left bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                  <FaBook className="text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {t("bookNewSession")}
                  </span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors">
                  <FaChartLine className="text-green-600 dark:text-green-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {t("learningReport")}
                  </span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors">
                  <FaBell className="text-purple-600 dark:text-purple-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {t("notificationSettings")}
                  </span>
                </button>

                {/* 멘토 신청 버튼 - 학생만 표시 */}
                {user?.role === "student" && (
                  <button
                    onClick={() => navigate("/mentor-application")}
                    className="w-full flex items-center gap-3 p-3 text-left bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg hover:from-orange-100 hover:to-red-100 dark:hover:from-orange-900/40 dark:hover:to-red-900/40 transition-all duration-200 border border-orange-200 dark:border-orange-700"
                  >
                    <FaGraduationCap className="text-orange-600 dark:text-orange-400" />
                    <div className="flex-1">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {t("becomeMentor")}
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {t("mentorApplicationHint")}
                      </p>
                    </div>
                  </button>
                )}

                {/* 멘토인 경우 멘토 대시보드로 돌아가는 버튼 */}
                {user?.role === "mentor" && (
                  <button
                    onClick={switchToMentorMode}
                    className="w-full flex items-center gap-3 p-3 text-left bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors"
                  >
                    <FaChalkboardTeacher className="text-orange-600 dark:text-orange-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {t("switchToMentorMode")}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
