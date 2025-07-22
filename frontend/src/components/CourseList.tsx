import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaStar, FaClock, FaUser, FaBook } from "react-icons/fa";

interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  price: number;
  duration: number;
  thumbnail?: string;
  tags: string[];
  language: string;
  mentor: {
    name: string;
    email: string;
  };
  enrollmentCount: number;
  rating: number;
  reviewCount: number;
}

const CourseList: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("createdAt");

  const categories = [
    { value: "", label: "전체 카테고리" },
    { value: "programming", label: "프로그래밍" },
    { value: "design", label: "디자인" },
    { value: "business", label: "비즈니스" },
    { value: "language", label: "언어" },
    { value: "music", label: "음악" },
    { value: "other", label: "기타" },
  ];

  const levels = [
    { value: "", label: "전체 레벨" },
    { value: "beginner", label: "초급" },
    { value: "intermediate", label: "중급" },
    { value: "advanced", label: "고급" },
  ];

  const languages = [
    { value: "", label: "전체 언어" },
    { value: "ko", label: "한국어" },
    { value: "en", label: "English" },
    { value: "mn", label: "Монгол" },
  ];

  const sortOptions = [
    { value: "createdAt", label: "최신순" },
    { value: "price", label: "가격순" },
    { value: "rating", label: "평점순" },
    { value: "enrollmentCount", label: "인기순" },
  ];

  useEffect(() => {
    fetchCourses();
  }, [
    searchTerm,
    selectedCategory,
    selectedLevel,
    selectedLanguage,
    priceRange,
    sortBy,
  ]);

  const fetchCourses = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (selectedCategory) params.append("category", selectedCategory);
      if (selectedLevel) params.append("level", selectedLevel);
      if (selectedLanguage) params.append("language", selectedLanguage);
      if (priceRange.min) params.append("minPrice", priceRange.min);
      if (priceRange.max) params.append("maxPrice", priceRange.max);
      params.append("sortBy", sortBy);
      params.append("order", "desc");

      const response = await fetch(
        `https://ezkv3-production.up.railway.app/api/course?${params.toString()}`
      );
      const data = await response.json();

      if (data.success) {
        setCourses(data.courses || []);
      } else {
        console.error("강의 목록 조회 실패:", data.message);
      }
    } catch (error) {
      console.error("강의 목록 조회 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryLabel = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      programming: "프로그래밍",
      design: "디자인",
      business: "비즈니스",
      language: "언어",
      music: "음악",
      other: "기타",
    };
    return categoryMap[category] || category;
  };

  const getLevelLabel = (level: string) => {
    const levelMap: { [key: string]: string } = {
      beginner: "초급",
      intermediate: "중급",
      advanced: "고급",
    };
    return levelMap[level] || level;
  };

  const getLanguageLabel = (language: string) => {
    const languageMap: { [key: string]: string } = {
      ko: "한국어",
      en: "English",
      mn: "Монгол",
    };
    return languageMap[language] || language;
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`${
            i <= rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
          } text-sm`}
        />
      );
    }
    return stars;
  };

  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            강의 찾기 📚
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            관리자가 승인한 다양한 강의들을 찾아보세요!
          </p>
        </div>

        {/* 검색 및 필터 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* 검색 */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="강의 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* 카테고리 필터 */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>

            {/* 레벨 필터 */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              {levels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>

            {/* 언어 필터 */}
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              {languages.map((language) => (
                <option key={language.value} value={language.value}>
                  {language.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 가격 범위 */}
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="최소 가격"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, min: e.target.value })
                }
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
              <span className="flex items-center text-gray-500">~</span>
              <input
                type="number"
                placeholder="최대 가격"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, max: e.target.value })
                }
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* 정렬 */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* 결과 수 */}
            <div className="flex items-center justify-end text-sm text-gray-600 dark:text-gray-400">
              총 {courses.length}개의 강의
            </div>
          </div>
        </div>

        {/* 강의 목록 */}
        {courses.length === 0 ? (
          <div className="text-center py-12">
            <FaBook className="mx-auto text-6xl text-gray-400 dark:text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              강의가 없습니다
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              검색 조건을 변경해보세요.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                onClick={() => handleCourseClick(course._id)}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
              >
                {/* 썸네일 */}
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FaBook className="text-4xl text-gray-400 dark:text-gray-600" />
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                      {getCategoryLabel(course.category)}
                    </span>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">
                      {getLevelLabel(course.level)}
                    </span>
                  </div>
                </div>

                {/* 강의 정보 */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {course.description}
                  </p>

                  {/* 멘토 정보 */}
                  <div className="flex items-center mb-3">
                    <FaUser className="text-gray-400 text-sm mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {course.mentor.name}
                    </span>
                  </div>

                  {/* 평점 */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center mr-2">
                      {renderStars(course.rating)}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      ({course.reviewCount})
                    </span>
                  </div>

                  {/* 강의 시간 */}
                  <div className="flex items-center mb-3">
                    <FaClock className="text-gray-400 text-sm mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {course.duration}분
                    </span>
                  </div>

                  {/* 태그 */}
                  {course.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {course.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* 가격 */}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {course.price.toLocaleString()}원
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {getLanguageLabel(course.language)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
