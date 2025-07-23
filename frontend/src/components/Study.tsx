import React from "react";
import { useTranslation } from "react-i18next";

const Study: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8">
        📚 {t("study")}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* 수강신청 가이드 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3 md:mb-4">
            {t("courseRegistrationGuideTitle")}
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4">
            {t("courseRegistrationGuideDesc")}
          </p>
          <button className="w-full bg-blue-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base">
            {t("viewDetails")}
          </button>
        </div>

        {/* 학업 도구 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3 md:mb-4">
            {t("academicToolsTitle")}
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4">
            {t("academicToolsDesc")}
          </p>
          <button className="w-full bg-blue-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base">
            {t("useTool")}
          </button>
        </div>

        {/* 졸업 요건 체크리스트 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3 md:mb-4">
            {t("graduationRequirementsTitle")}
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4">
            {t("graduationRequirementsDesc")}
          </p>
          <button className="w-full bg-blue-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base">
            {t("viewChecklist")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Study;
