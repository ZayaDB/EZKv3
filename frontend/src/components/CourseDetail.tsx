import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaStar,
  FaClock,
  FaUser,
  FaBook,
  FaPlay,
  FaDownload,
  FaTag,
} from "react-icons/fa";

interface Lesson {
  title: string;
  description: string;
  duration: number;
  videoUrl: string;
  materials: Array<{
    name: string;
    url: string;
    type: string;
  }>;
}

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
  lessons: Lesson[];
  mentor: {
    name: string;
    email: string;
  };
  enrollmentCount: number;
  rating: number;
  reviewCount: number;
}

const CourseDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      fetchCourseDetail();
    }
  }, [id]);

  const fetchCourseDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://ezkv3-production.up.railway.app/api/course/${id}`
      );
      const data = await response.json();

      if (data.success) {
        setCourse(data.course);
      } else {
        setError(data.message || "강의를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("강의 상세 조회 오류:", error);
      setError("강의 정보를 불러오는 중 오류가 발생했습니다.");
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
          } text-lg`}
        />
      );
    }
    return stars;
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}시간 ${mins}분`;
    }
    return `${mins}분`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <FaBook className="mx-auto text-6xl text-gray-400 dark:text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {error || "강의를 찾을 수 없습니다"}
          </h3>
          <button
            onClick={() => navigate("/courses")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            강의 목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => navigate("/courses")}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          강의 목록으로 돌아가기
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 강의 썸네일 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              {course.thumbnail ? (
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-64 object-cover"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <FaBook className="text-6xl text-gray-400 dark:text-gray-600" />
                </div>
              )}
            </div>

            {/* 강의 정보 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {course.title}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center">
                      <FaUser className="mr-1" />
                      {course.mentor.name}
                    </span>
                    <span className="flex items-center">
                      <FaClock className="mr-1" />
                      {formatDuration(course.duration)}
                    </span>
                    <span>{getLanguageLabel(course.language)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {course.price.toLocaleString()}원
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    수강생 {course.enrollmentCount}명
                  </div>
                </div>
              </div>

              {/* 태그 */}
              {course.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full flex items-center"
                    >
                      <FaTag className="mr-1 text-xs" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* 카테고리 및 레벨 */}
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm rounded-full">
                  {getCategoryLabel(course.category)}
                </span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm rounded-full">
                  {getLevelLabel(course.level)}
                </span>
              </div>

              {/* 평점 */}
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-2">
                  {renderStars(course.rating)}
                </div>
                <span className="text-lg font-semibold text-gray-900 dark:text-white mr-2">
                  {course.rating.toFixed(1)}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  ({course.reviewCount}개의 리뷰)
                </span>
              </div>

              {/* 강의 설명 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  강의 소개
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {course.description}
                </p>
              </div>
            </div>

            {/* 강의 목록 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                강의 목록 ({course.lessons.length}개 강의)
              </h3>
              <div className="space-y-3">
                {course.lessons.map((lesson, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {lesson.title}
                        </h4>
                        {lesson.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {lesson.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <FaClock className="mr-1" />
                      {lesson.duration}분
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 수강 신청 카드 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {course.price.toLocaleString()}원
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  평생 수강 가능
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-3">
                수강 신청하기
              </button>

              <button className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                장바구니에 담기
              </button>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  이 강의에 포함된 것
                </h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center">
                    <FaPlay className="mr-2 text-green-500" />
                    {course.lessons.length}개의 강의
                  </li>
                  <li className="flex items-center">
                    <FaClock className="mr-2 text-green-500" />총{" "}
                    {formatDuration(course.duration)}
                  </li>
                  <li className="flex items-center">
                    <FaDownload className="mr-2 text-green-500" />
                    다운로드 가능한 자료
                  </li>
                  <li className="flex items-center">
                    <FaBook className="mr-2 text-green-500" />
                    평생 수강 가능
                  </li>
                </ul>
              </div>
            </div>

            {/* 멘토 정보 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                멘토 정보
              </h3>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                  <FaUser className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {course.mentor.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {course.mentor.email}
                  </p>
                </div>
              </div>
              <button className="w-full border border-blue-600 text-blue-600 dark:text-blue-400 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                멘토 프로필 보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
