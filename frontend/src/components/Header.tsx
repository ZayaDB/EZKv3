import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }

    // 다크모드 상태 확인
    const darkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    }

    // 로그인 상태 변경 감지
    const handleStorageChange = () => {
      const newToken = localStorage.getItem("token");
      const newUserData = localStorage.getItem("user");

      if (newToken && newUserData) {
        setIsLoggedIn(true);
        setUser(JSON.parse(newUserData));
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("loginStateChanged", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("loginStateChanged", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setShowUserMenu(false);
    navigate("/");
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const getLanguageFlag = (lng: string) => {
    const flags: { [key: string]: string } = {
      ko: "🇰🇷",
      en: "🇺🇸",
      mn: "🇲🇳",
    };
    return flags[lng] || "🌐";
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("title")}
            </h1>
          </div>

          {/* 네비게이션 메뉴 */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {t("mentorSearch")}
            </a>
            <a
              href="#"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {t("freelancer")}
            </a>
            <a
              href="#"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {t("courses")}
            </a>
          </nav>

          {/* 우측 메뉴 */}
          <div className="flex items-center space-x-4">
            {/* 언어 선택 */}
            <div className="relative">
              <button
                onClick={() => {
                  const currentLang = i18n.language;
                  const languages = ["ko", "en", "mn"];
                  const currentIndex = languages.indexOf(currentLang);
                  const nextIndex = (currentIndex + 1) % languages.length;
                  changeLanguage(languages[nextIndex]);
                }}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <span className="text-lg">
                  {getLanguageFlag(i18n.language)}
                </span>
                <span>{t("language")}</span>
              </button>
            </div>

            {/* 다크모드 토글 */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>

            {/* 로그인/사용자 메뉴 */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <FaUser className="text-blue-600 dark:text-blue-400 text-sm" />
                  </div>
                  <span className="hidden sm:block">{user?.name}</span>
                </button>

                {/* 사용자 드롭다운 메뉴 */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                    <div className="py-2">
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          navigate("/dashboard");
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <FaUser className="mr-3" />
                        {t("mypage")}
                      </button>

                      {/* 관리자 메뉴 */}
                      {user?.role === "admin" && (
                        <button
                          onClick={() => {
                            setShowUserMenu(false);
                            navigate("/admin");
                          }}
                          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <FaCog className="mr-3" />
                          관리자 대시보드
                        </button>
                      )}

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <FaSignOutAlt className="mr-3" />
                        로그아웃
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t("login")}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
