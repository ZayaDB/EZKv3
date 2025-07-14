import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import EnglandFlag from "../assets/england.svg";
import KoreaFlag from "../assets/img_koreanFlag_02.jpg";
import MongoliaFlag from "../assets/Flag_of_Mongolia.png";

const fontClass = "font-pretendard";
const isLoggedIn = true;

const LANGS = [
  { code: "en", label: "English", flag: EnglandFlag, aria: "English" },
  { code: "ko", label: "한국어", flag: KoreaFlag, aria: "한국어" },
  { code: "mn", label: "Монгол", flag: MongoliaFlag, aria: "Монгол" },
];

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || "ko");
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGS.find((l) => l.code === lang) || LANGS[1];

  const handleLangChange = (code: string) => {
    setLang(code);
    i18n.changeLanguage(code);
    setOpen(false);
  };

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(document.documentElement.classList.contains("dark"));
  };

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <header className={`w-full shadow-md ${fontClass}`}>
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* 로고/서비스명 */}
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          {t("title")}
        </div>
        {/* 네비게이션 메뉴 */}
        <nav className="flex gap-6">
          <a
            href="/mentors"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500"
          >
            {t("mentorSearch")}
          </a>
          <a
            href="/mentors"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500"
          >
            {t("freelancer")}
          </a>
          <a
            href="/courses"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500"
          >
            {t("courses")}
          </a>
        </nav>
        {/* 우측: 로그인/언어/다크모드/마이페이지 */}
        <div className="flex items-center gap-4">
          {/* 언어 선택: 국기+언어명 드롭다운 */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-1 px-2 py-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => setOpen((o) => !o)}
              aria-label="언어 선택"
              type="button"
            >
              <img
                src={currentLang.flag}
                alt={currentLang.aria}
                className="w-6 h-6 rounded-full mr-1"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {currentLang.label}
              </span>
              <span
                className={`ml-1 text-gray-500 transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 animate-fadeIn">
                {LANGS.map(({ code, label, flag, aria }) => (
                  <button
                    key={code}
                    aria-label={aria}
                    onClick={() => handleLangChange(code)}
                    className={`flex items-center w-full px-3 py-2 gap-2 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors duration-150 ${
                      lang === code
                        ? "font-bold text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-900"
                        : "text-gray-700 dark:text-gray-200"
                    }`}
                  >
                    <img
                      src={flag}
                      alt={aria}
                      className="w-5 h-5 rounded-full"
                    />
                    <span className="text-sm">{label}</span>
                    {lang === code && (
                      <span className="ml-auto text-xs">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* 다크모드 토글: 스위치 */}
          <button
            className={`relative w-12 h-6 flex items-center rounded-full transition-colors duration-300 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              isDark ? "bg-blue-600" : "bg-yellow-400"
            }`}
            onClick={toggleDarkMode}
            aria-label="다크모드 토글"
            type="button"
          >
            <span className="absolute left-1 text-yellow-400 text-lg select-none">
              ☀️
            </span>
            <span className="absolute right-1 text-blue-400 text-lg select-none">
              🌙
            </span>
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full shadow-md transition-transform duration-300 bg-white border ${
                isDark ? "translate-x-6 border-blue-600" : "border-yellow-400"
              }`}
            />
          </button>
          {isLoggedIn ? (
            <a
              href="/dashboard"
              className="text-2xl text-blue-500 hover:text-blue-700"
            >
              <FaUserCircle />
            </a>
          ) : (
            <button className="px-4 py-1 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400">
              {t("login")}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
