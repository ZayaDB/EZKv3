import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FaUser, FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
// 국기 이미지 import
import koreanFlag from "../assets/img_koreanFlag_02.jpg";
import englandFlag from "../assets/england.svg";
import mongoliaFlag from "../assets/Flag_of_Mongolia.png";

interface HeaderProps {
  showLNB: boolean;
  setShowLNB: (show: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ showLNB, setShowLNB }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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
      ko: koreanFlag,
      en: englandFlag,
      mn: mongoliaFlag,
    };
    return flags[lng] || koreanFlag;
  };

  const getLanguageName = (lng: string) => {
    const names: { [key: string]: string } = {
      ko: "한국어",
      en: "English",
      mn: "Монгол",
    };
    return names[lng] || "한국어";
  };

  const handleMobileMenuClick = (path: string) => {
    navigate(path);
    setShowMobileMenu(false);
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* 햄버거 메뉴 (로그인된 사용자만) */}
            {isLoggedIn && (
              <button
                onClick={() => setShowLNB(!showLNB)}
                className="lg:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaBars className="text-lg" />
              </button>
            )}

            {/* 모바일 메뉴 버튼 (로그인되지 않은 사용자용) */}
            {!isLoggedIn && (
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {showMobileMenu ? (
                  <FaTimes className="text-lg" />
                ) : (
                  <FaBars className="text-lg" />
                )}
              </button>
            )}

            {/* 로고 */}
            <div
              className="flex items-center cursor-pointer"
              onClick={() => navigate("/")}
            >
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {t("title")}
              </h1>
            </div>

            {/* 네비게이션 메뉴 (데스크톱) */}
            <nav className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => navigate("/study")}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                {t("study")}
              </button>
              <button
                onClick={() => navigate("/community")}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                {t("community")}
              </button>
              <button
                onClick={() => navigate("/freelancer")}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                {t("freelancer")}
              </button>
            </nav>

            {/* 우측 메뉴 */}
            <div className="flex items-center space-x-2 md:space-x-4">
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
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  title={`현재 언어: ${getLanguageName(i18n.language)}`}
                >
                  <div className="flex items-center space-x-2">
                    <img
                      src={getLanguageFlag(i18n.language)}
                      alt={`${getLanguageName(i18n.language)} flag`}
                      className="w-5 h-3 object-cover rounded-sm shadow-sm"
                    />
                    <span className="hidden md:block">
                      {getLanguageName(i18n.language)}
                    </span>
                  </div>
                </button>
              </div>

              {/* 다크모드 토글 */}
              <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                title={isDarkMode ? "라이트 모드로 전환" : "다크 모드로 전환"}
              >
                {isDarkMode ? (
                  <FaSun className="text-sm md:text-base" />
                ) : (
                  <FaMoon className="text-sm md:text-base" />
                )}
              </button>

              {/* 로그인/사용자 메뉴 */}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center overflow-hidden">
                      {user?.profileImage ? (
                        <img
                          src={user.profileImage}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FaUser className="text-blue-600 dark:text-blue-400 text-sm" />
                      )}
                    </div>
                    <span className="hidden sm:block">{user?.name}</span>
                  </button>

                  {/* 사용자 드롭다운 메뉴 */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          navigate("/dashboard");
                        }}
                        className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        {t("dashboard")}
                      </button>
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          navigate("/settings");
                        }}
                        className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        {t("settings")}
                      </button>
                      <hr className="my-2 border-gray-200 dark:border-gray-700" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        {t("logout")}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigate("/login")}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {t("login")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 모바일 메뉴 */}
      {showMobileMenu && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed top-0 left-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                메뉴
              </h2>
              <button
                onClick={() => setShowMobileMenu(false)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <FaTimes />
              </button>
            </div>
            <nav className="p-6 space-y-4">
              <button
                onClick={() => handleMobileMenuClick("/study")}
                className="w-full text-left py-3 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium"
              >
                📚 {t("study")}
              </button>
              <button
                onClick={() => handleMobileMenuClick("/community")}
                className="w-full text-left py-3 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium"
              >
                👥 {t("community")}
              </button>
              <button
                onClick={() => handleMobileMenuClick("/freelancer")}
                className="w-full text-left py-3 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium"
              >
                💼 {t("freelancer")}
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
