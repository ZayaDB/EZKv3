import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaBook,
  FaCalendarAlt,
  FaChartLine,
  FaBell,
  FaHeart,
  FaCreditCard,
  FaQuestionCircle,
  FaTimes,
  FaBars,
} from "react-icons/fa";

interface LNBProps {
  isOpen: boolean;
  onClose: () => void;
}

const LNB: React.FC<LNBProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    onClose();
    navigate("/");
    window.dispatchEvent(new Event("loginStateChanged"));
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "대시보드",
      icon: FaGraduationCap,
      path: "/dashboard",
      roles: ["student", "mentor"],
    },
    {
      id: "courses",
      label: "강의 찾기",
      icon: FaBook,
      path: "/courses",
      roles: ["student", "mentor"],
    },
    {
      id: "mentor-search",
      label: "멘토 찾기",
      icon: FaChalkboardTeacher,
      path: "/mentor-search",
      roles: ["student"],
    },
    {
      id: "mentor-dashboard",
      label: "멘토 대시보드",
      icon: FaChalkboardTeacher,
      path: "/mentor-dashboard",
      roles: ["mentor"],
    },
    {
      id: "sessions",
      label: "세션 관리",
      icon: FaCalendarAlt,
      path: "/sessions",
      roles: ["student", "mentor"],
    },
    {
      id: "progress",
      label: "학습 진행률",
      icon: FaChartLine,
      path: "/progress",
      roles: ["student"],
    },
    {
      id: "notifications",
      label: "알림 설정",
      icon: FaBell,
      path: "/notifications",
      roles: ["student", "mentor"],
    },
    {
      id: "favorites",
      label: "즐겨찾기",
      icon: FaHeart,
      path: "/favorites",
      roles: ["student", "mentor"],
    },
    {
      id: "payments",
      label: "결제 내역",
      icon: FaCreditCard,
      path: "/payments",
      roles: ["student", "mentor"],
    },
    {
      id: "settings",
      label: "설정",
      icon: FaCog,
      path: "/settings",
      roles: ["student", "mentor"],
    },
    {
      id: "help",
      label: "도움말",
      icon: FaQuestionCircle,
      path: "/help",
      roles: ["student", "mentor"],
    },
  ];

  const filteredMenuItems = menuItems.filter(
    (item) => user && item.roles.includes(user.role)
  );

  return (
    <>
      {/* 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* LNB */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:shadow-none`}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center overflow-hidden">
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUser className="text-blue-600 dark:text-blue-400" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {user?.name || "사용자"}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user?.role === "student"
                  ? "학생"
                  : user?.role === "mentor"
                  ? "멘토"
                  : "관리자"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <FaTimes />
          </button>
        </div>

        {/* 메뉴 */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-4 space-y-2">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    isActive(item.path)
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  <Icon className="text-lg" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* 구분선 */}
          <div className="px-4 py-4">
            <div className="border-t border-gray-200 dark:border-gray-700" />
          </div>

          {/* 로그아웃 */}
          <div className="px-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
            >
              <FaSignOutAlt className="text-lg" />
              <span className="font-medium">로그아웃</span>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default LNB;
