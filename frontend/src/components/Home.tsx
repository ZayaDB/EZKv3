import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const services = [
    {
      id: "study",
      title: `📚 ${t("study")}`,
      description: t("studyDescription"),
      path: "/study",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
    },
    {
      id: "life",
      title: `🏠 ${t("life")}`,
      description: t("lifeDescription"),
      path: "/life",
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
    },
    {
      id: "community",
      title: `👥 ${t("community")}`,
      description: t("communityDescription"),
      path: "/community",
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
    },
    {
      id: "freelancer",
      title: `💼 ${t("freelancer")}`,
      description: t("freelancerDescription"),
      path: "/freelancer",
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600",
    },
    {
      id: "mentoring",
      title: `🎓 ${t("mentoring")}`,
      description: t("mentoringDescription"),
      path: "/mentoring",
      color: "bg-indigo-500",
      hoverColor: "hover:bg-indigo-600",
    },
    {
      id: "ai-assistant",
      title: `🤖 ${t("aiAssistant")}`,
      description: t("aiAssistantDescription"),
      path: "/ai-assistant",
      color: "bg-pink-500",
      hoverColor: "hover:bg-pink-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {t("heroSubtitle")}
            <span className="block text-blue-600 dark:text-blue-400">
              {t("heroTitle")}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            {t("heroDescription")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/register")}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
            >
              {t("getStarted")}
            </button>
            <button
              onClick={() => navigate("/study")}
              className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-8 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-lg font-semibold"
            >
              {t("exploreServices")}
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => navigate(service.path)}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
            >
              <div
                className={`${service.color} ${service.hoverColor} transition-colors rounded-t-xl p-6`}
              >
                <h3 className="text-2xl font-bold text-white mb-2">
                  {service.title}
                </h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {service.description}
                </p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-2 transition-transform">
                  {t("viewDetails")}
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            {t("whyEZKorea")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t("customizedService")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t("customizedServiceDesc")}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t("multilingualSupport")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t("multilingualSupportDesc")}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t("communityCentered")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t("communityCenteredDesc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
