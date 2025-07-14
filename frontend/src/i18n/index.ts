import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      title: "EZKorea",
      mentorSearch: "Find Mentor",
      freelancer: "Freelancer",
      courses: "Courses",
      login: "Login",
      mypage: "My Page",
      language: "Language",
      about: "About",
      contact: "Contact",
      terms: "Terms of Service",
      privacy: "Privacy Policy",
    },
  },
  ko: {
    translation: {
      title: "EZKorea",
      mentorSearch: "멘토 찾기",
      freelancer: "프리랜서",
      courses: "강의 목록",
      login: "로그인",
      mypage: "마이페이지",
      language: "언어",
      about: "서비스 소개",
      contact: "문의",
      terms: "이용약관",
      privacy: "개인정보처리방침",
    },
  },
  mn: {
    translation: {
      title: "EZKorea",
      mentorSearch: "Ментор хайх",
      freelancer: "Чөлөөт ажилтан",
      courses: "Лекцийн жагсаалт",
      login: "Нэвтрэх",
      mypage: "Миний хуудас",
      language: "Хэл",
      about: "Танилцуулга",
      contact: "Холбоо барих",
      terms: "Үйлчилгээний нөхцөл",
      privacy: "Нууцлалын бодлого",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ko",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
