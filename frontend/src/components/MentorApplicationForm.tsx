import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  FaGraduationCap,
  FaBriefcase,
  FaStar,
  FaFileAlt,
  FaCheck,
} from "react-icons/fa";
import axios from "axios";

const MentorApplicationForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    specialization: "",
    experience: "",
    education: "",
    introduction: "",
    hourlyRate: "",
    languages: "",
    certifications: "",
    portfolio: "",
    availability: "",
    motivation: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://ezkv3-production.up.railway.app/api/mentor/apply",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err: any) {
      setLoading(false);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError(t("applicationError") || "신청에 실패했습니다.");
      }
    }
  };

  const specializations = [
    "JavaScript/TypeScript",
    "React/Vue/Angular",
    "Node.js/Express",
    "Python/Django/Flask",
    "Java/Spring",
    "C#/.NET",
    "Mobile Development",
    "DevOps/AWS",
    "Database/SQL",
    "Machine Learning/AI",
    "UI/UX Design",
    "Project Management",
  ];

  const experienceLevels = ["1-2 years", "3-5 years", "5-8 years", "8+ years"];

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCheck className="text-green-600 dark:text-green-400 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t("applicationSubmitted")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {t("applicationSubmittedMessage")}
          </p>
          <div className="animate-pulse">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: "60%" }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {t("reviewInProgress")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaGraduationCap className="text-blue-600 dark:text-blue-400 text-3xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t("becomeMentor")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("mentorApplicationDescription")}
          </p>
        </div>

        {/* 진행 단계 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                1
              </div>
              <span className="text-gray-900 dark:text-white font-medium">
                {t("applicationForm")}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 text-gray-500 rounded-full flex items-center justify-center text-sm">
                2
              </div>
              <span className="text-gray-500 dark:text-gray-400">
                {t("adminReview")}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 text-gray-500 rounded-full flex items-center justify-center text-sm">
                3
              </div>
              <span className="text-gray-500 dark:text-gray-400">
                {t("approval")}
              </span>
            </div>
          </div>
        </div>

        {/* 신청 폼 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 전문 분야 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FaStar className="inline mr-2 text-blue-600" />
                {t("specialization")} *
              </label>
              <select
                name="specialization"
                value={form.specialization}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">{t("selectSpecialization")}</option>
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            {/* 경력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FaBriefcase className="inline mr-2 text-blue-600" />
                {t("experience")} *
              </label>
              <select
                name="experience"
                value={form.experience}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">{t("selectExperience")}</option>
                {experienceLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            {/* 학력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FaGraduationCap className="inline mr-2 text-blue-600" />
                {t("education")}
              </label>
              <textarea
                name="education"
                value={form.education}
                onChange={handleChange}
                rows={3}
                placeholder={t("educationPlaceholder")}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* 자기소개 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FaFileAlt className="inline mr-2 text-blue-600" />
                {t("introduction")} *
              </label>
              <textarea
                name="introduction"
                value={form.introduction}
                onChange={handleChange}
                rows={4}
                placeholder={t("introductionPlaceholder")}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* 시급 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                💰 {t("hourlyRate")} (USD) *
              </label>
              <input
                type="number"
                name="hourlyRate"
                value={form.hourlyRate}
                onChange={handleChange}
                placeholder="25"
                min="10"
                max="200"
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* 사용 언어 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                🌍 {t("languages")} *
              </label>
              <input
                type="text"
                name="languages"
                value={form.languages}
                onChange={handleChange}
                placeholder={t("languagesPlaceholder")}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* 자격증 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                🏆 {t("certifications")}
              </label>
              <textarea
                name="certifications"
                value={form.certifications}
                onChange={handleChange}
                rows={2}
                placeholder={t("certificationsPlaceholder")}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* 포트폴리오 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                🔗 {t("portfolio")}
              </label>
              <input
                type="url"
                name="portfolio"
                value={form.portfolio}
                onChange={handleChange}
                placeholder="https://github.com/yourusername"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* 멘토링 동기 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                💭 {t("motivation")} *
              </label>
              <textarea
                name="motivation"
                value={form.motivation}
                onChange={handleChange}
                rows={3}
                placeholder={t("motivationPlaceholder")}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* 제출 버튼 */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {t("cancel")}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? t("submitting") : t("submitApplication")}
              </button>
            </div>

            {/* 에러 메시지 */}
            {error && (
              <div className="text-red-500 text-sm text-center mt-4">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default MentorApplicationForm;
