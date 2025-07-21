import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaGraduationCap,
  FaCalendarAlt,
  FaStar,
  FaClock,
  FaBook,
  FaChartLine,
  FaBell,
  FaCheck,
} from "react-icons/fa";

const Dashboard: React.FC = () => {
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
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, [navigate]);

  // 임시 데이터 (나중에 API에서 가져올 예정)
  const mockData = {
    totalSessions: 12,
    completedSessions: 8,
    upcomingSessions: 2,
    averageRating: 4.8,
    totalHours: 24,
    currentStreak: 5,
    nextSession: {
      date: "2024-01-25",
      time: "14:00",
      mentor: "김멘토",
      subject: "JavaScript 고급 문법",
    },
    recentSessions: [
      {
        date: "2024-01-20",
        mentor: "김멘토",
        subject: "React Hooks",
        rating: 5,
      },
      {
        date: "2024-01-18",
        mentor: "이멘토",
        subject: "TypeScript 기초",
        rating: 4,
      },
      {
        date: "2024-01-15",
        mentor: "박멘토",
        subject: "Node.js 서버",
        rating: 5,
      },
    ],
    progress: {
      javascript: 75,
      react: 60,
      typescript: 45,
      nodejs: 30,
    },
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t("welcome")}, {user?.name}님! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t("welcomeMessage")}
          </p>
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
                  {mockData.totalSessions}
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
                  {t("totalHours")}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {mockData.totalHours}h
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
              {mockData.upcomingSessions > 0 ? (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {mockData.nextSession.subject}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {t("mentor")}: {mockData.nextSession.mentor}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {mockData.nextSession.date} {mockData.nextSession.time}
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

            {/* 최근 세션 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t("recentSessions")}
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
                {Object.entries(mockData.progress).map(([skill, progress]) => (
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
                ))}
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
                {/* 멘토 전환 버튼 */}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
