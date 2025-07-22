import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaStar,
  FaClock,
  FaDollarSign,
  FaGraduationCap,
  FaFilter,
  FaLanguage,
} from "react-icons/fa";

interface Mentor {
  _id: string;
  name: string;
  email: string;
  mentorInfo: {
    specialization: string;
    experience: string;
    introduction: string;
    hourlyRate: number;
    languages: string;
    rating: number;
    totalSessions: number;
  };
}

const MentorSearch: React.FC = () => {
  const navigate = useNavigate();
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  const categories = [
    { value: "", label: "전체" },
    { value: "programming", label: "프로그래밍" },
    { value: "design", label: "디자인" },
    { value: "business", label: "비즈니스" },
    { value: "language", label: "언어" },
    { value: "music", label: "음악" },
    { value: "other", label: "기타" },
  ];

  const languages = [
    { value: "", label: "전체" },
    { value: "ko", label: "한국어" },
    { value: "en", label: "English" },
    { value: "mn", label: "Монгол" },
  ];

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://ezkv3-production.up.railway.app/api/mentor/approved`
      );
      const data = await response.json();

      if (data.success) {
        setMentors(data.mentors);
      } else {
        console.error("멘토 목록 조회 실패:", data.message);
      }
    } catch (error) {
      console.error("멘토 목록 조회 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.mentorInfo.specialization
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      mentor.mentorInfo.introduction
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesCategory =
      !selectedCategory ||
      mentor.mentorInfo.specialization === selectedCategory;

    const matchesLanguage =
      !selectedLanguage ||
      mentor.mentorInfo.languages.includes(selectedLanguage);

    const matchesPrice =
      mentor.mentorInfo.hourlyRate >= priceRange.min &&
      mentor.mentorInfo.hourlyRate <= priceRange.max;

    return matchesSearch && matchesCategory && matchesLanguage && matchesPrice;
  });

  const handleMentorClick = (mentorId: string) => {
    navigate(`/mentor/${mentorId}`);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`text-sm ${
          i < rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
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
            멘토 찾기 🔍
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            전문 멘토들과 함께 성장하세요!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 필터 사이드바 */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FaFilter />
                필터
              </h2>

              {/* 검색 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  검색
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="멘토 이름, 전문분야 검색..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
              </div>

              {/* 카테고리 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  전문분야
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 언어 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  언어
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  {languages.map((language) => (
                    <option key={language.value} value={language.value}>
                      {language.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 가격 범위 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  시간당 가격 (원)
                </label>
                <div className="space-y-2">
                  <input
                    type="number"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange({
                        ...priceRange,
                        min: Number(e.target.value),
                      })
                    }
                    placeholder="최소"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                  <input
                    type="number"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({
                        ...priceRange,
                        max: Number(e.target.value),
                      })
                    }
                    placeholder="최대"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* 결과 수 */}
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {filteredMentors.length}명의 멘토
              </div>
            </div>
          </div>

          {/* 멘토 목록 */}
          <div className="lg:col-span-3">
            {filteredMentors.length === 0 ? (
              <div className="text-center py-12">
                <FaGraduationCap className="text-gray-400 text-6xl mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  멘토를 찾을 수 없습니다
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  검색 조건을 변경해보세요.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredMentors.map((mentor) => (
                  <div
                    key={mentor._id}
                    onClick={() => handleMentorClick(mentor._id)}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group"
                  >
                    {/* 멘토 프로필 */}
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
                        <FaGraduationCap className="text-blue-600 dark:text-blue-400 text-2xl" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {mentor.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {mentor.mentorInfo.specialization}
                        </p>
                      </div>
                    </div>

                    {/* 평점 */}
                    <div className="flex items-center mb-3">
                      <div className="flex mr-2">
                        {renderStars(mentor.mentorInfo.rating)}
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {mentor.mentorInfo.rating.toFixed(1)}
                      </span>
                    </div>

                    {/* 소개 */}
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                      {mentor.mentorInfo.introduction}
                    </p>

                    {/* 정보 */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <FaClock className="mr-2" />
                        <span>{mentor.mentorInfo.totalSessions}회 세션</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <FaLanguage className="mr-2" />
                        <span>{mentor.mentorInfo.languages}</span>
                      </div>
                    </div>

                    {/* 가격 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-green-600 dark:text-green-400 font-semibold">
                        <FaDollarSign className="mr-1" />
                        <span>
                          {mentor.mentorInfo.hourlyRate.toLocaleString()}원/시간
                        </span>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        상세보기
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorSearch;
