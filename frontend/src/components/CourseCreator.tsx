import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaTrash,
  FaSave,
  FaEye,
  FaEyeSlash,
  FaUpload,
  FaLink,
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

const CourseCreator: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "programming",
    level: "beginner",
    price: 0,
    duration: 0,
    thumbnail: "",
    tags: [] as string[],
    language: "ko",
    lessons: [] as Lesson[],
  });
  const [newTag, setNewTag] = useState("");
  const [newLesson, setNewLesson] = useState<Lesson>({
    title: "",
    description: "",
    duration: 0,
    videoUrl: "",
    materials: [],
  });

  const categories = [
    { value: "programming", label: "프로그래밍" },
    { value: "design", label: "디자인" },
    { value: "business", label: "비즈니스" },
    { value: "language", label: "언어" },
    { value: "music", label: "음악" },
    { value: "other", label: "기타" },
  ];

  const levels = [
    { value: "beginner", label: "초급" },
    { value: "intermediate", label: "중급" },
    { value: "advanced", label: "고급" },
  ];

  const languages = [
    { value: "ko", label: "한국어" },
    { value: "en", label: "English" },
    { value: "mn", label: "Монгол" },
  ];

  const handleInputChange = (field: string, value: any) => {
    setCourseData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !courseData.tags.includes(newTag.trim())) {
      setCourseData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setCourseData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleAddLesson = () => {
    if (newLesson.title.trim()) {
      setCourseData((prev) => ({
        ...prev,
        lessons: [...prev.lessons, { ...newLesson }],
        duration: prev.duration + newLesson.duration,
      }));
      setNewLesson({
        title: "",
        description: "",
        duration: 0,
        videoUrl: "",
        materials: [],
      });
    }
  };

  const handleRemoveLesson = (index: number) => {
    setCourseData((prev) => ({
      ...prev,
      duration: prev.duration - prev.lessons[index].duration,
      lessons: prev.lessons.filter((_, i) => i !== index),
    }));
  };

  const handleAddMaterial = () => {
    const material = {
      name: "새 자료",
      url: "",
      type: "link",
    };
    setNewLesson((prev) => ({
      ...prev,
      materials: [...prev.materials, material],
    }));
  };

  const handleRemoveMaterial = (materialIndex: number) => {
    setNewLesson((prev) => ({
      ...prev,
      materials: prev.materials.filter((_, i) => i !== materialIndex),
    }));
  };

  const handleSubmit = async () => {
    if (!courseData.title.trim() || !courseData.description.trim()) {
      alert("강의 제목과 설명을 입력해주세요.");
      return;
    }

    if (courseData.lessons.length === 0) {
      alert("최소 하나의 강의를 추가해주세요.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://ezkv3-production.up.railway.app/api/course`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(courseData),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("강의가 성공적으로 생성되었습니다!");
        navigate("/mentor-dashboard");
      } else {
        alert(data.message || "강의 생성에 실패했습니다.");
      }
    } catch (error) {
      console.error("강의 생성 오류:", error);
      alert("강의 생성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              새 강의 만들기 📚
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              멘토링 경험을 바탕으로 온라인 강의를 만들어보세요!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 메인 폼 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 기본 정보 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  기본 정보
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      강의 제목 *
                    </label>
                    <input
                      type="text"
                      value={courseData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="강의 제목을 입력하세요"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      강의 설명 *
                    </label>
                    <textarea
                      value={courseData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="강의에 대한 자세한 설명을 입력하세요"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        카테고리
                      </label>
                      <select
                        value={courseData.category}
                        onChange={(e) =>
                          handleInputChange("category", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      >
                        {categories.map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        난이도
                      </label>
                      <select
                        value={courseData.level}
                        onChange={(e) =>
                          handleInputChange("level", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      >
                        {levels.map((level) => (
                          <option key={level.value} value={level.value}>
                            {level.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        언어
                      </label>
                      <select
                        value={courseData.language}
                        onChange={(e) =>
                          handleInputChange("language", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      >
                        {languages.map((language) => (
                          <option key={language.value} value={language.value}>
                            {language.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        가격 (원)
                      </label>
                      <input
                        type="number"
                        value={courseData.price}
                        onChange={(e) =>
                          handleInputChange("price", Number(e.target.value))
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="0"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        썸네일 URL
                      </label>
                      <input
                        type="url"
                        value={courseData.thumbnail}
                        onChange={(e) =>
                          handleInputChange("thumbnail", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      태그
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="태그를 입력하고 Enter를 누르세요"
                      />
                      <button
                        onClick={handleAddTag}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {courseData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                        >
                          {tag}
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 강의 목록 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  강의 목록 ({courseData.lessons.length}개)
                </h2>

                {/* 새 강의 추가 */}
                <div className="mb-6 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    새 강의 추가
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        강의 제목
                      </label>
                      <input
                        type="text"
                        value={newLesson.title}
                        onChange={(e) =>
                          setNewLesson({ ...newLesson, title: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="강의 제목"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        강의 설명
                      </label>
                      <textarea
                        value={newLesson.description}
                        onChange={(e) =>
                          setNewLesson({
                            ...newLesson,
                            description: e.target.value,
                          })
                        }
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="강의 설명"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          강의 시간 (분)
                        </label>
                        <input
                          type="number"
                          value={newLesson.duration}
                          onChange={(e) =>
                            setNewLesson({
                              ...newLesson,
                              duration: Number(e.target.value),
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          placeholder="30"
                          min="1"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          비디오 URL
                        </label>
                        <input
                          type="url"
                          value={newLesson.videoUrl}
                          onChange={(e) =>
                            setNewLesson({
                              ...newLesson,
                              videoUrl: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          placeholder="https://youtube.com/watch?v=..."
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleAddLesson}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <FaPlus />
                      강의 추가
                    </button>
                  </div>
                </div>

                {/* 추가된 강의 목록 */}
                <div className="space-y-4">
                  {courseData.lessons.map((lesson, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {lesson.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {lesson.description}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {lesson.duration}분
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveLesson(index)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 사이드바 */}
            <div className="space-y-6">
              {/* 미리보기 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  강의 미리보기
                </h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      제목
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {courseData.title || "제목을 입력하세요"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      카테고리
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {
                        categories.find((c) => c.value === courseData.category)
                          ?.label
                      }
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      난이도
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {levels.find((l) => l.value === courseData.level)?.label}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      가격
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {courseData.price.toLocaleString()}원
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      총 강의 시간
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {courseData.duration}분
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      강의 수
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {courseData.lessons.length}개
                    </p>
                  </div>
                </div>
              </div>

              {/* 액션 버튼 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                <div className="space-y-3">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <FaSave />
                    )}
                    {loading ? "생성 중..." : "강의 생성"}
                  </button>
                  <button
                    onClick={() => navigate("/mentor-dashboard")}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCreator;
