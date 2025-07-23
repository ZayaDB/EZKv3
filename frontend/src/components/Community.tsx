import React from "react";
import { useTranslation } from "react-i18next";

const Community: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8">
        👥 {t("community")}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* 공지사항 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3 md:mb-4">
            {t("announcementsTitle")}
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4">
            {t("announcementsDesc")}
          </p>
          <button className="w-full bg-blue-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base">
            {t("viewAnnouncements")}
          </button>
        </div>

        {/* 학교별 모임 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3 md:mb-4">
            {t("schoolGroupsTitle")}
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4">
            {t("schoolGroupsDesc")}
          </p>
          <button className="w-full bg-blue-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base">
            {t("findGroups")}
          </button>
        </div>

        {/* 동아리/클럽 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3 md:mb-4">
            {t("clubsTitle")}
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4">
            {t("clubsDesc")}
          </p>
          <button className="w-full bg-blue-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base">
            {t("viewClubs")}
          </button>
        </div>

        {/* 친구 찾기 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3 md:mb-4">
            {t("findFriendsTitle")}
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4">
            {t("findFriendsDesc")}
          </p>
          <button className="w-full bg-blue-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base">
            {t("findFriendsTitle")}
          </button>
        </div>

        {/* 이벤트/모임 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3 md:mb-4">
            {t("eventsTitle")}
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4">
            {t("eventsDesc")}
          </p>
          <button className="w-full bg-blue-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base">
            {t("viewEvents")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Community;
