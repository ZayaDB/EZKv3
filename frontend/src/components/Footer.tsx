import React from "react";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer className="w-full py-8 mt-8 bg-gradient-to-t from-gray-900 via-gray-800 to-gray-700 font-pretendard">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-4">
        <div className="text-gray-200 text-lg font-semibold tracking-wide drop-shadow-sm">
          © 2024 EZKorea. All rights reserved.
        </div>
        <div className="flex gap-6 mt-2 md:mt-0">
          <a
            href="/about"
            className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-base font-medium"
          >
            {t("about")}
          </a>
          <a
            href="/contact"
            className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-base font-medium"
          >
            {t("contact")}
          </a>
          <a
            href="/terms"
            className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-base font-medium"
          >
            {t("terms")}
          </a>
          <a
            href="/privacy"
            className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-base font-medium"
          >
            {t("privacy")}
          </a>
        </div>
        {/* SNS 아이콘 (기본 구조) */}
        <div className="flex gap-4 mt-2 md:mt-0">
          <a
            href="#"
            aria-label="Instagram"
            className="text-gray-400 hover:text-pink-400 text-2xl transition-colors duration-200"
          >
            📷
          </a>
          <a
            href="#"
            aria-label="Facebook"
            className="text-gray-400 hover:text-blue-500 text-2xl transition-colors duration-200"
          >
            📘
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="text-gray-400 hover:text-blue-300 text-2xl transition-colors duration-200"
          >
            🐦
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
