import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaCalendarAlt,
  FaStar,
  FaDollarSign,
  FaChartLine,
  FaBell,
  FaCheck,
  FaUserGraduate,
  FaGraduationCap,
} from "react-icons/fa";

const MentorDashboard: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role !== "mentor") {
        navigate("/dashboard");
        return;
      }
      setUser(parsedUser);
    }
    setLoading(false);
  }, [navigate]);

  // 임시 데이터 (나중에 API에서 가져올 예정)
  const mockData = {
    totalStudents: 8,
    completedSessions: 24,
    upcomingSessions: 3,
    averageRating: 4.9,
    totalEarnings: 1200,
    thisMonthEarnings: 320,
    nextSession: {
      date: "2024-01-25",
      time: "15:00",
      student: "김학생",
      subject: "React 고급 문법",
      duration: 60,
    },
    recentSessions: [
      {
        date: "2024-01-20",
        student: "이학생",
        subject: "JavaScript 기초",
        rating: 5,
        earnings: 50,
      },
      {
        date: "2024-01-18",
        student: "박학생",
        subject: "TypeScript 입문",
        rating: 4,
        earnings: 60,
      },
      {
        date: "2024-01-15",
        student: "최학생",
        subject: "Node.js 서버",
        rating: 5,
        earnings: 70,
      },
    ],
    pendingRequests: [
      {
        id: 1,
        student: "정학생",
        subject: "React Hooks",
        date: "2024-01-26",
        time: "14:00",
        duration: 90,
      },
      {
        id: 2,
        student: "한학생",
        subject: "JavaScript ES6+",
        date: "2024-01-27",
        time: "16:00",
        duration: 60,
      },
    ],
  };

  const handleAcceptRequest = (requestId: number) => {
    // 멘토링 요청 승인 로직
    console.log("Accept request:", requestId);
  };

  const handleRejectRequest = (requestId: number) => {
    // 멘토링 요청 거절 로직
    console.log("Reject request:", requestId);
  };

  const switchToStudentMode = () => {
    // 학생 대시보드로 전환
    navigate("/dashboard");
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
        {/* 헤더 섹션 */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {t("mentorDashboard")} 👨‍🏫
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {user?.name}님, {t("mentorDashboardMessage")}
              </p>
            </div>
            <button
              onClick={switchToStudentMode}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaUserGraduate />
              {t("switchToStudentMode")}
            </button>
          </div>
        </div>

        {/* 통계 카드 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t("totalStudents")}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {mockData.totalStudents}
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <FaUsers className="text-blue-600 dark:text-blue-400 text-xl" />
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
                  {mockData.completedSessions}
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
                  {mockData.averageRating}
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
                  {t("totalEarnings")}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${mockData.totalEarnings}
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <FaDollarSign className="text-green-600 dark:text-green-400 text-xl" />
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
                  {t("nextMentoringSession")}
                </h2>
                <FaCalendarAlt className="text-blue-600 dark:text-blue-400" />
              </div>
              {mockData.upcomingSessions > 0 ? (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {mockData.nextSession.subject}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {t("mentor")}: {mockData.nextSession.student}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {mockData.nextSession.date} {mockData.nextSession.time}{" "}
                        ({mockData.nextSession.duration}분)
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      {t("startSession")}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FaCalendarAlt className="text-gray-400 text-4xl mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    {t("noUpcomingSessions")}
                  </p>
                </div>
              )}
            </div>

            {/* 대기중인 요청 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t("pendingRequests")}
              </h2>
              <div className="space-y-4">
                {mockData.pendingRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {request.subject}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {request.student} • {request.date} {request.time} (
                        {request.duration}분)
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAcceptRequest(request.id)}
                        className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        {t("accept")}
                      </button>
                      <button
                        onClick={() => handleRejectRequest(request.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                      >
                        {t("reject")}
                      </button>
                    </div>
                  </div>
                ))}
                {mockData.pendingRequests.length === 0 && (
                  <div className="text-center py-8">
                    <FaBell className="text-gray-400 text-4xl mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      {t("noPendingRequests")}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 최근 세션 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t("recentMentoringSessions")}
              </h2>
              <div className="space-y-4">
                {mockData.recentSessions.map((session, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {session.subject}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {session.student} • {session.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
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
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        ${session.earnings}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 이번 달 수익 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t("thisMonthEarnings")}
              </h2>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  ${mockData.thisMonthEarnings}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  지난 달 대비 +15%
                </p>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* 멘토 정보 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t("mentorInfo")}
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("specialization")}
                  </p>
                  <p className="text-gray-900 dark:text-white">
                    {user?.mentorInfo?.specialization || "JavaScript/React"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("hourlyRate")}
                  </p>
                  <p className="text-gray-900 dark:text-white">
                    ${user?.mentorInfo?.hourlyRate || 50}/hr
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("languages")}
                  </p>
                  <p className="text-gray-900 dark:text-white">
                    {user?.mentorInfo?.languages || "한국어, 영어"}
                  </p>
                </div>
              </div>
            </div>

            {/* 빠른 액션 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t("quickActions")}
              </h2>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 text-left bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                  <FaCalendarAlt className="text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {t("scheduleManagement")}
                  </span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors">
                  <FaChartLine className="text-green-600 dark:text-green-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {t("earningsReport")}
                  </span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors">
                  <FaBell className="text-purple-600 dark:text-purple-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {t("notificationSettings")}
                  </span>
                </button>
                <button
                  onClick={switchToStudentMode}
                  className="w-full flex items-center gap-3 p-3 text-left bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors"
                >
                  <FaUserGraduate className="text-orange-600 dark:text-orange-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {t("switchToStudentMode")}
                  </span>
                </button>
                <button
                  onClick={() => navigate("/create-course")}
                  className="w-full flex items-center gap-3 p-3 text-left bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors"
                >
                  <FaGraduationCap className="text-purple-600 dark:text-purple-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    새 강의 만들기
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
