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
      // Dashboard translations
      welcome: "Hello",
      welcomeMessage: "Keep growing through mentoring today",
      totalSessions: "Total Sessions",
      completedSessions: "Completed Sessions",
      averageRating: "Average Rating",
      totalHours: "Total Hours",
      nextSession: "Next Mentoring Session",
      noUpcomingSessions: "No upcoming sessions",
      findMentor: "Find Mentor",
      joinSession: "Join Session",
      recentSessions: "Recent Mentoring Sessions",
      learningProgress: "Learning Progress",
      quickActions: "Quick Actions",
      bookNewSession: "Book New Session",
      learningReport: "Learning Report",
      notificationSettings: "Notification Settings",
      mentor: "Mentor",
      subject: "Subject",
      date: "Date",
      time: "Time",
      // Mentor Dashboard translations
      mentorDashboard: "Mentor Dashboard",
      mentorDashboardMessage:
        "Share your knowledge and earn income through mentoring!",
      totalStudents: "Total Students",
      upcomingSessions: "Upcoming Sessions",
      totalEarnings: "Total Earnings",
      thisMonthEarnings: "This Month's Earnings",
      nextMentoringSession: "Next Mentoring Session",
      pendingRequests: "Pending Requests",
      recentMentoringSessions: "Recent Mentoring Sessions",
      accept: "Accept",
      reject: "Reject",
      startSession: "Start Session",
      noPendingRequests: "No pending requests",
      mentorInfo: "My Mentor Info",
      scheduleManagement: "Schedule Management",
      earningsReport: "Earnings Report",
      switchToStudentMode: "Switch to Student Mode",
      switchToMentorMode: "Switch to Mentor Mode",
      // Admin Dashboard translations
      adminDashboard: "Admin Dashboard",
      adminDashboardMessage: "Manage mentor applications and platform users",
      mentorApplications: "Mentor Applications",
      allMentors: "All Mentors",
      pendingApplications: "Pending Applications",
      approvedApplications: "Approved Applications",
      rejectedApplications: "Rejected Applications",
      applicationDetails: "Application Details",
      viewDetails: "View Details",
      noApplications: "No applications found",
      noMentors: "No mentors found",
      applicationStatus: "Application Status",
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected",
      // Common
      loading: "Loading...",
      email: "Email",
      password: "Password",
      register: "Register",
      rememberMe: "Remember me",
      forgotPassword: "Forgot password?",
      noAccount: "Don't have an account?",
      loginError: "Login failed",
      loginSuccess: "Login successful",
      // Register specific
      name: "Name",
      alreadyUser: "Already have an account?",
      registerError: "Registration failed",
      registerSuccess: "Registration successful!",
      // Mentor application
      becomeMentor: "Become a Mentor",
      mentorApplicationDescription:
        "Share your knowledge and help others grow. Apply to become a mentor and start your teaching journey.",
      applicationForm: "Application Form",
      adminReview: "Admin Review",
      approval: "Approval",
      specialization: "Specialization",
      selectSpecialization: "Select your specialization",
      experience: "Experience",
      selectExperience: "Select your experience level",
      education: "Education",
      educationPlaceholder: "Tell us about your educational background...",
      introduction: "Introduction",
      introductionPlaceholder:
        "Introduce yourself and your teaching approach...",
      hourlyRate: "Hourly Rate",
      languages: "Languages",
      languagesPlaceholder: "e.g., English, Korean, Mongolian",
      certifications: "Certifications",
      certificationsPlaceholder: "List your relevant certifications...",
      portfolio: "Portfolio",
      motivation: "Motivation",
      motivationPlaceholder: "Why do you want to become a mentor?",
      cancel: "Cancel",
      submitting: "Submitting...",
      submitApplication: "Submit Application",
      applicationError: "Application failed",
      applicationSubmitted: "Application Submitted!",
      applicationSubmittedMessage:
        "Your mentor application has been submitted successfully. We will review it and get back to you soon.",
      reviewInProgress: "Review in progress...",
      mentorApplicationHint: "Apply to become a mentor and help others",

      // New menu translations
      study: "Study",
      life: "Life",
      community: "Community",
      mentoring: "Mentoring",
      aiAssistant: "AI Assistant",

      // Home page translations
      heroTitle: "Comprehensive Platform",
      heroSubtitle: "For International Students in Korea",
      heroDescription:
        "From learning to daily life and community. We make your study abroad experience in Korea more convenient and enjoyable.",
      getStarted: "Get Started",
      exploreServices: "Explore Services",
      whyEZKorea: "Why EZKorea?",
      customizedService: "Customized Service",
      customizedServiceDesc:
        "We provide efficient help with services tailored to the actual needs of international students.",
      multilingualSupport: "Multilingual Support",
      multilingualSupportDesc:
        "Supporting Korean, English, and Mongolian so all international students can use it conveniently.",
      communityCentered: "Community Centered",
      communityCenteredDesc:
        "You can communicate and share information with other international students who have similar experiences.",

      // Service descriptions
      studyDescription:
        "Course registration guide, academic tools, graduation requirements checklist",
      lifeDescription:
        "Housing search, part-time jobs, transportation/communication, hospitals/pharmacies",
      communityDescription:
        "Announcements, school groups, clubs/organizations, find friends",
      freelancerDescription: "Job board, project registration, portfolio",
      mentoringDescription: "Find mentors, course list, 1:1 consultation",
      aiAssistantDescription:
        "Chatbot consultation, personalized recommendations, real-time help",

      // Study section
      courseRegistrationGuide: "Course Registration Guide",
      courseRegistrationDescription:
        "Learn how to register for courses at Korean universities and get tips.",
      academicTools: "Academic Tools",
      academicToolsDescription:
        "Use useful tools like GPA calculator, scheduler, and more.",
      graduationRequirements: "Graduation Requirements Checklist",
      graduationRequirementsDescription:
        "Check and manage the requirements needed for graduation.",

      // Life section
      housingSearch: "Housing Search",
      housingSearchDescription:
        "Find various housing options like dormitories, studios, and homestays.",
      partTimeJob: "Part-time Jobs",
      partTimeJobDescription:
        "Check part-time job information suitable for international students.",
      transportation: "Transportation & Communication",
      transportationDescription:
        "Check essential life information like transportation cards and mobile carriers.",
      hospital: "Hospitals & Pharmacies",
      hospitalDescription: "Find foreigner-friendly hospitals and pharmacies.",

      // Community section
      announcements: "Announcements",
      announcementsDescription: "Check important announcements and updates.",
      schoolGroups: "School Groups",
      schoolGroupsDescription:
        "Communicate and share information with students from the same school.",
      clubs: "Clubs & Organizations",
      clubsDescription: "Join various clubs and organizations.",
      findFriends: "Find Friends",
      findFriendsDescription: "Find friends with similar interests.",
      events: "Events & Meetups",
      eventsDescription: "Participate in various events and meetups.",

      // Freelancer section
      jobBoard: "Job Board",
      jobBoardDescription:
        "Find various freelance opportunities like translation, interpretation, tutoring, and design.",
      projectRegistration: "Project Registration",
      projectRegistrationDescription:
        "Register your projects and find suitable freelancers.",
      portfolioDescription: "Showcase your work and highlight your experience.",
      contractManagement: "Contract & Payment Management",
      contractManagementDescription:
        "Trade safely with our secure escrow system.",

      // Mentoring section
      findMentorDescription:
        "Find a mentor that suits you and receive 1:1 consultation.",
      courseList: "Course List",
      courseListDescription:
        "Take various courses in Korean, academics, culture, and more.",
      consultation: "1:1 Consultation",
      consultationDescription:
        "Consult with mentors about personal concerns or questions.",

      // AI Assistant section
      chatbot: "Chatbot Consultation",
      chatbotDescription: "Consult with AI chatbot anytime, 24/7.",
      personalizedRecommendation: "Personalized Recommendations",
      personalizedRecommendationDescription:
        "AI analyzes and recommends services tailored to you.",
      realTimeHelp: "Real-time Help",
      realTimeHelpDescription: "Get real-time help in emergency situations.",

      // Common buttons
      useTool: "Use Tool",
      viewChecklist: "View Checklist",
      viewInfo: "View Info",
      findHospital: "Find Hospital",
      viewAnnouncements: "View Announcements",
      findGroups: "Find Groups",
      viewClubs: "View Clubs",
      viewEvents: "View Events",
      viewBoard: "View Board",
      registerProject: "Register Project",
      createPortfolio: "Create Portfolio",
      manageTransactions: "Manage Transactions",
      searchMentor: "Search Mentor",
      viewCourses: "View Courses",
      requestConsultation: "Request Consultation",
      startChatbot: "Start Chatbot",
      getRecommendations: "Get Recommendations",
      requestHelp: "Request Help",

      // Page specific translations
      courseRegistrationGuideTitle: "Course Registration Guide",
      courseRegistrationGuideDesc:
        "Learn how to register for courses at Korean universities and get tips.",
      academicToolsTitle: "Academic Tools",
      academicToolsDesc:
        "Use useful tools like GPA calculator, scheduler, and more.",
      graduationRequirementsTitle: "Graduation Requirements Checklist",
      graduationRequirementsDesc:
        "Check and manage the requirements needed for graduation.",

      // Life page
      housingSearchTitle: "Housing Search",
      housingSearchDesc:
        "Find various housing options like dormitories, studios, and homestays.",
      partTimeJobTitle: "Part-time Jobs",
      partTimeJobDesc:
        "Check part-time job information suitable for international students.",
      transportationTitle: "Transportation & Communication",
      transportationDesc:
        "Check essential life information like transportation cards and mobile carriers.",
      hospitalTitle: "Hospitals & Pharmacies",
      hospitalDesc: "Find foreigner-friendly hospitals and pharmacies.",

      // Community page
      announcementsTitle: "Announcements",
      announcementsDesc: "Check important announcements and updates.",
      schoolGroupsTitle: "School Groups",
      schoolGroupsDesc:
        "Communicate and share information with students from the same school.",
      clubsTitle: "Clubs & Organizations",
      clubsDesc: "Join various clubs and organizations.",
      findFriendsTitle: "Find Friends",
      findFriendsDesc: "Find friends with similar interests.",
      eventsTitle: "Events & Meetups",
      eventsDesc: "Participate in various events and meetups.",

      // Freelancer page
      jobBoardTitle: "Job Board",
      jobBoardDesc:
        "Find various freelance opportunities like translation, interpretation, tutoring, and design.",
      projectRegistrationTitle: "Project Registration",
      projectRegistrationDesc:
        "Register your projects and find suitable freelancers.",
      portfolioTitle: "Portfolio",
      portfolioDesc: "Showcase your work and highlight your experience.",
      contractManagementTitle: "Contract & Payment Management",
      contractManagementDesc: "Trade safely with our secure escrow system.",

      // Mentoring page
      findMentorTitle: "Find Mentor",
      findMentorDesc:
        "Find a mentor that suits you and receive 1:1 consultation.",
      courseListTitle: "Course List",
      courseListDesc:
        "Take various courses in Korean, academics, culture, and more.",
      consultationTitle: "1:1 Consultation",
      consultationDesc:
        "Consult with mentors about personal concerns or questions.",

      // AI Assistant page
      chatbotTitle: "Chatbot Consultation",
      chatbotDesc: "Consult with AI chatbot anytime, 24/7.",
      personalizedRecommendationTitle: "Personalized Recommendations",
      personalizedRecommendationDesc:
        "AI analyzes and recommends services tailored to you.",
      realTimeHelpTitle: "Real-time Help",
      realTimeHelpDesc: "Get real-time help in emergency situations.",
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
      // Dashboard translations
      welcome: "안녕하세요",
      welcomeMessage: "오늘도 멘토링을 통해 성장해보세요",
      totalSessions: "총 세션",
      completedSessions: "완료된 세션",
      averageRating: "평균 평점",
      totalHours: "총 학습 시간",
      nextSession: "다음 멘토링 세션",
      noUpcomingSessions: "예정된 세션이 없습니다",
      findMentor: "멘토 찾기",
      joinSession: "세션 참여",
      recentSessions: "최근 멘토링 세션",
      learningProgress: "학습 진행률",
      quickActions: "빠른 액션",
      bookNewSession: "새 세션 예약",
      learningReport: "학습 리포트",
      notificationSettings: "알림 설정",
      mentor: "멘토",
      subject: "과목",
      date: "날짜",
      time: "시간",
      // Mentor Dashboard translations
      mentorDashboard: "멘토 대시보드",
      mentorDashboardMessage: "멘토링을 통해 지식을 나누고 수익을 창출하세요!",
      totalStudents: "총 학생 수",
      upcomingSessions: "예정된 세션",
      totalEarnings: "총 수익",
      thisMonthEarnings: "이번 달 수익",
      nextMentoringSession: "다음 멘토링 세션",
      pendingRequests: "대기중인 요청",
      recentMentoringSessions: "최근 멘토링 세션",
      accept: "승인",
      reject: "거절",
      startSession: "세션 시작",
      noPendingRequests: "대기중인 요청이 없습니다",
      mentorInfo: "내 멘토 정보",
      scheduleManagement: "일정 관리",
      earningsReport: "수익 리포트",
      switchToStudentMode: "학생 모드로 전환",
      switchToMentorMode: "멘토 대시보드로 돌아가기",
      // Admin Dashboard translations
      adminDashboard: "관리자 대시보드",
      adminDashboardMessage: "멘토 신청서와 플랫폼 사용자를 관리하세요",
      mentorApplications: "멘토 신청서",
      allMentors: "전체 멘토",
      pendingApplications: "대기중인 신청",
      approvedApplications: "승인된 신청",
      rejectedApplications: "거절된 신청",
      applicationDetails: "신청서 상세",
      viewDetails: "상세보기",
      noApplications: "신청서가 없습니다",
      noMentors: "멘토가 없습니다",
      applicationStatus: "신청 상태",
      pending: "대기중",
      approved: "승인됨",
      rejected: "거절됨",
      // Common
      loading: "로딩 중...",
      email: "이메일",
      password: "비밀번호",
      register: "회원가입",
      rememberMe: "아이디 저장",
      forgotPassword: "비밀번호를 잊으셨나요?",
      noAccount: "아직 회원이 아니신가요?",
      loginError: "로그인에 실패했습니다",
      loginSuccess: "로그인이 완료되었습니다",
      // Register specific
      name: "이름",
      alreadyUser: "이미 계정이 있으신가요?",
      registerError: "회원가입에 실패했습니다",
      registerSuccess: "회원가입이 완료되었습니다!",
      // Mentor application
      becomeMentor: "멘토 되기",
      mentorApplicationDescription:
        "지식을 나누고 다른 사람들의 성장을 도와주세요. 멘토 신청을 통해 가르침의 여정을 시작하세요.",
      applicationForm: "신청서 작성",
      adminReview: "관리자 검토",
      approval: "승인",
      specialization: "전문 분야",
      selectSpecialization: "전문 분야를 선택하세요",
      experience: "경력",
      selectExperience: "경력 수준을 선택하세요",
      education: "학력",
      educationPlaceholder: "학력 배경에 대해 알려주세요...",
      introduction: "자기소개",
      introductionPlaceholder:
        "자신을 소개하고 가르침 방식에 대해 설명해주세요...",
      hourlyRate: "시급",
      languages: "사용 언어",
      languagesPlaceholder: "예: 영어, 한국어, 몽골어",
      certifications: "자격증",
      certificationsPlaceholder: "관련 자격증을 나열해주세요...",
      portfolio: "포트폴리오",
      motivation: "멘토링 동기",
      motivationPlaceholder: "멘토가 되고 싶은 이유는 무엇인가요?",
      cancel: "취소",
      submitting: "제출 중...",
      submitApplication: "신청서 제출",
      applicationError: "신청에 실패했습니다",
      applicationSubmitted: "신청서 제출 완료!",
      applicationSubmittedMessage:
        "멘토 신청서가 성공적으로 제출되었습니다. 검토 후 곧 연락드리겠습니다.",
      reviewInProgress: "검토 중...",
      mentorApplicationHint: "멘토가 되어 다른 사람들을 도와주세요",

      // New menu translations
      study: "공부",
      life: "생활",
      community: "커뮤니티",
      mentoring: "멘토링",
      aiAssistant: "AI 어시스턴트",

      // Home page translations
      heroTitle: "EZKorea",
      heroSubtitle: "한국 외국인 학생을 위한 종합 플랫폼",
      heroDescription:
        "학업부터 일상생활, 커뮤니티까지. 한국 유학 경험을 더 편리하고 즐겁게 만들어드립니다.",
      getStarted: "시작하기",
      exploreServices: "서비스 탐색",
      whyEZKorea: "왜 EZKorea인가요?",
      customizedService: "맞춤형 서비스",
      customizedServiceDesc:
        "국제 학생들의 실제 필요에 맞춰 효율적인 도움을 제공합니다.",
      multilingualSupport: "다언어 지원",
      multilingualSupportDesc:
        "한국어, 영어, 몽골어를 지원하여 모든 국제 학생들이 편리하게 사용할 수 있습니다.",
      communityCentered: "커뮤니티 중심",
      communityCenteredDesc:
        "비슷한 경험을 가진 다른 국제 학생들과 소통하고 정보를 공유할 수 있습니다.",

      // Service descriptions
      studyDescription: "수강 신청 가이드, 학업 도구, 졸업 요건 체크리스트",
      lifeDescription: "주거 찾기, 아르바이트, 교통 & 통신, 병원 & 약국",
      communityDescription: "공지사항, 학교 그룹, 동호회 & 단체, 친구 찾기",
      freelancerDescription: "구인 게시판, 프로젝트 등록, 포트폴리오",
      mentoringDescription: "멘토 찾기, 강의 목록, 1:1 상담",
      aiAssistantDescription: "챗봇 상담, 개인화된 추천, 실시간 도움",

      // Study section
      courseRegistrationGuide: "수강 신청 가이드",
      courseRegistrationDescription:
        "한국 대학교 수강 신청 방법과 팁을 배워보세요.",
      academicTools: "학업 도구",
      academicToolsDescription:
        "GPA 계산기, 스케줄러 등 유용한 도구를 사용해보세요.",
      graduationRequirements: "졸업 요건 체크리스트",
      graduationRequirementsDescription:
        "졸업에 필요한 요건을 확인하고 관리해보세요.",

      // Life section
      housingSearch: "주거 찾기",
      housingSearchDescription:
        "기숙사, 원룸, 홈스테이 등 다양한 주거 옵션을 찾아보세요.",
      partTimeJob: "아르바이트",
      partTimeJobDescription:
        "국제 학생을 위한 아르바이트 정보를 확인해보세요.",
      transportation: "교통 & 통신",
      transportationDescription:
        "교통카드, 통신사 등 필수적인 생활 정보를 확인해보세요.",
      hospital: "병원 & 약국",
      hospitalDescription: "외국인 편의를 위한 병원과 약국을 찾아보세요.",

      // Community section
      announcements: "공지사항",
      announcementsDescription: "중요한 공지사항과 업데이트를 확인해보세요.",
      schoolGroups: "학교 그룹",
      schoolGroupsDescription:
        "같은 학교 학생들과 정보를 공유하고 소통해보세요.",
      clubs: "동호회 & 단체",
      clubsDescription: "다양한 동호회와 단체에 참여해보세요.",
      findFriends: "친구 찾기",
      findFriendsDescription: "비슷한 관심사를 가진 친구를 찾아보세요.",
      events: "이벤트 & 모임",
      eventsDescription: "다양한 이벤트와 모임에 참여해보세요.",

      // Freelancer section
      jobBoard: "구인 게시판",
      jobBoardDescription:
        "번역, 통역, 튜터링, 디자인 등 다양한 프리랜서 기회를 찾아보세요.",
      projectRegistration: "프로젝트 등록",
      projectRegistrationDescription:
        "프로젝트를 등록하고 적합한 프리랜서를 찾아보세요.",
      portfolioDescription: "작업물을 전시하고 경험을 강조해보세요.",
      contractManagement: "계약 & 결제 관리",
      contractManagementDescription: "안전한 에스크로 시스템으로 거래해보세요.",

      // Mentoring section
      findMentorDescription: "당신에게 맞는 멘토를 찾고 1:1 상담을 받아보세요.",
      courseList: "강의 목록",
      courseListDescription:
        "한국어, 학업, 문화 등 다양한 강의를 수강해보세요.",
      consultation: "1:1 상담",
      consultationDescription:
        "개인적인 걱정이나 질문에 대해 멘토들과 상담해보세요.",

      // AI Assistant section
      chatbot: "챗봇 상담",
      chatbotDescription: "언제든지 AI 챗봇과 상담해보세요, 24/7.",
      personalizedRecommendation: "개인화된 추천",
      personalizedRecommendationDescription:
        "AI가 당신에게 맞는 서비스를 분석하고 추천해드립니다.",
      realTimeHelp: "실시간 도움",
      realTimeHelpDescription: "비상 상황에 대한 실시간 도움을 받아보세요.",

      // Common buttons
      useTool: "도구 사용",
      viewChecklist: "체크리스트 보기",
      viewInfo: "정보 보기",
      findHospital: "병원 찾기",
      viewAnnouncements: "공지사항 보기",
      findGroups: "그룹 찾기",
      viewClubs: "동호회 보기",
      viewEvents: "이벤트 보기",
      viewBoard: "게시판 보기",
      registerProject: "프로젝트 등록",
      createPortfolio: "포트폴리오 생성",
      manageTransactions: "Gүйлгээ удирдах",
      searchMentor: "Ментор хайх",
      viewCourses: "Хичээл харах",
      requestConsultation: "Зөвлөгөө хүсэх",
      startChatbot: "Чатбот эхлүүлэх",
      getRecommendations: "Зөвлөмж авах",
      requestHelp: "Тусламж хүсэх",

      // Page specific translations
      courseRegistrationGuideTitle: "수강 신청 가이드",
      courseRegistrationGuideDesc:
        "한국 대학교 수강 신청 방법과 팁을 배워보세요.",
      academicToolsTitle: "학업 도구",
      academicToolsDesc: "GPA 계산기, 스케줄러 등 유용한 도구를 사용해보세요.",
      graduationRequirementsTitle: "졸업 요건 체크리스트",
      graduationRequirementsDesc: "졸업에 필요한 요건을 확인하고 관리해보세요.",

      // Life page
      housingSearchTitle: "주거 찾기",
      housingSearchDesc:
        "기숙사, 원룸, 홈스테이 등 다양한 주거 옵션을 찾아보세요.",
      partTimeJobTitle: "아르바이트",
      partTimeJobDesc: "국제 학생을 위한 아르바이트 정보를 확인해보세요.",
      transportationTitle: "교통 & 통신",
      transportationDesc:
        "교통카드, 통신사 등 필수적인 생활 정보를 확인해보세요.",
      hospitalTitle: "병원 & 약국",
      hospitalDesc: "외국인 편의를 위한 병원과 약국을 찾아보세요.",

      // Community page
      announcementsTitle: "공지사항",
      announcementsDesc: "중요한 공지사항과 업데이트를 확인해보세요.",
      schoolGroupsTitle: "학교 그룹",
      schoolGroupsDesc: "같은 학교 학생들과 정보를 공유하고 소통해보세요.",
      clubsTitle: "동호회 & 단체",
      clubsDesc: "다양한 동호회와 단체에 참여해보세요.",
      findFriendsTitle: "친구 찾기",
      findFriendsDesc: "비슷한 관심사를 가진 친구를 찾아보세요.",
      eventsTitle: "이벤트 & 모임",
      eventsDesc: "다양한 이벤트와 모임에 참여해보세요.",

      // Freelancer page
      jobBoardTitle: "구인 게시판",
      jobBoardDesc:
        "번역, 통역, 튜터링, 디자인 등 다양한 프리랜서 기회를 찾아보세요.",
      projectRegistrationTitle: "프로젝트 등록",
      projectRegistrationDesc:
        "프로젝트를 등록하고 적합한 프리랜서를 찾아보세요.",
      portfolioTitle: "포트폴리오",
      portfolioDesc: "작업물을 전시하고 경험을 강조해보세요.",
      contractManagementTitle: "계약 & 결제 관리",
      contractManagementDesc: "안전한 에스크로 시스템으로 거래해보세요.",

      // Mentoring page
      findMentorTitle: "멘토 찾기",
      findMentorDesc: "당신에게 맞는 멘토를 찾고 1:1 상담을 받아보세요.",
      courseListTitle: "강의 목록",
      courseListDesc: "한국어, 학업, 문화 등 다양한 강의를 수강해보세요.",
      consultationTitle: "1:1 상담",
      consultationDesc: "개인적인 걱정이나 질문에 대해 멘토들과 상담해보세요.",

      // AI Assistant page
      chatbotTitle: "챗봇 상담",
      chatbotDesc: "언제든지 AI 챗봇과 상담해보세요, 24/7.",
      personalizedRecommendationTitle: "개인화된 추천",
      personalizedRecommendationDesc:
        "AI가 당신에게 맞는 서비스를 분석하고 추천해드립니다.",
      realTimeHelpTitle: "실시간 도움",
      realTimeHelpDesc: "비상 상황에 대한 실시간 도움을 받아보세요.",
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
      // Dashboard translations
      welcome: "Сайн байна уу",
      welcomeMessage:
        "Өнөөдөр ч гэсэн менторчлолын тусламжтайгаар өсөж байгаарай",
      totalSessions: "Нийт хичээл",
      completedSessions: "Дууссан хичээл",
      averageRating: "Дундаж үнэлгээ",
      totalHours: "Нийт сургалтын цаг",
      nextSession: "Дараагийн менторчлолын хичээл",
      noUpcomingSessions: "Төлөвлөгдсөн хичээл байхгүй",
      findMentor: "Ментор хайх",
      joinSession: "Хичээлд оролцох",
      recentSessions: "Сүүлийн менторчлолын хичээлүүд",
      learningProgress: "Сургалтын явц",
      quickActions: "Хурдан үйлдэл",
      bookNewSession: "Шинэ хичээл захиалах",
      learningReport: "Сургалтын тайлан",
      notificationSettings: "Мэдэгдлийн тохиргоо",
      mentor: "Ментор",
      subject: "Хичээл",
      date: "Огноо",
      time: "Цаг",
      // Mentor Dashboard translations
      mentorDashboard: "Менторын самбар",
      mentorDashboardMessage:
        "Мэдлэгээ хуваалцаж, менторчлолын тусламжтайгаар орлого олно уу!",
      totalStudents: "Нийт сурагч",
      upcomingSessions: "Төлөвлөгдсөн хичээлүүд",
      totalEarnings: "Нийт орлого",
      thisMonthEarnings: "Энэ сарын орлого",
      nextMentoringSession: "Дараагийн менторчлолын хичээл",
      pendingRequests: "Хүлээгдэж буй хүсэлтүүд",
      recentMentoringSessions: "Сүүлийн менторчлолын хичээлүүд",
      accept: "Зөвшөөрөх",
      reject: "Татгалзах",
      startSession: "Хичээл эхлүүлэх",
      noPendingRequests: "Хүлээгдэж буй хүсэлт байхгүй",
      mentorInfo: "Миний менторын мэдээлэл",
      scheduleManagement: "Хуваарийн удирдлага",
      earningsReport: "Орлогын тайлан",
      switchToStudentMode: "Сурагчийн горимд шилжих",
      switchToMentorMode: "Менторын самбар руу буцах",
      // Admin Dashboard translations
      adminDashboard: "Админ самбар",
      adminDashboardMessage:
        "Ментор болох хүсэлтүүд болон платформын хэрэглэгчдийг удирдах",
      mentorApplications: "Ментор болох хүсэлтүүд",
      allMentors: "Бүх менторууд",
      pendingApplications: "Хүлээгдэж буй хүсэлтүүд",
      approvedApplications: "Зөвшөөрөгдсөн хүсэлтүүд",
      rejectedApplications: "Татгалзсан хүсэлтүүд",
      applicationDetails: "Хүсэлтийн дэлгэрэнгүй",
      viewDetails: "Дэлгэрэнгүй харах",
      noApplications: "Хүсэлт олдсонгүй",
      noMentors: "Ментор олдсонгүй",
      applicationStatus: "Хүсэлтийн төлөв",
      pending: "Хүлээгдэж буй",
      approved: "Зөвшөөрөгдсөн",
      rejected: "Татгалзсан",
      // Common
      loading: "Уншиж байна...",
      email: "И-мэйл",
      password: "Нууц үг",
      register: "Бүртгүүлэх",
      rememberMe: "Намайг сана",
      forgotPassword: "Нууц үгээ мартсан уу?",
      noAccount: "Бүртгэл байхгүй юу?",
      loginError: "Нэвтрэх амжилтгүй",
      loginSuccess: "Амжилттай нэвтэрлээ",
      // Register specific
      name: "Нэр",
      alreadyUser: "Энэ нэртэй хэрэглэгч байна уу?",
      registerError: "Бүртгүүлэх амжилтгүй",
      registerSuccess: "Амжилттай бүртгэлтэй",
      // Mentor application
      becomeMentor: "Ментор болох",
      mentorApplicationDescription:
        "Мэдлэгээ хуваалцаж, бусдын хөгжилд тусална уу. Ментор болох хүсэлтээ өгч, заах аялалаа эхлүүлнэ үү.",
      applicationForm: "Хүсэлтийн маягт",
      adminReview: "Админ шалгалт",
      approval: "Зөвшөөрөл",
      specialization: "Мэргэжлийн чиглэл",
      selectSpecialization: "Мэргэжлийн чиглэлээ сонгоно уу",
      experience: "Туршлага",
      selectExperience: "Туршлагын түвшингээ сонгоно уу",
      education: "Боловсрол",
      educationPlaceholder: "Боловсролын талаар бидэнд хэлнэ үү...",
      introduction: "Танилцуулга",
      introductionPlaceholder:
        "Өөрийгөө танилцуулж, заах арга барилаа тайлбарлана уу...",
      hourlyRate: "Цагийн хөлс",
      languages: "Хэл",
      languagesPlaceholder: "жишээ нь: Англи, Солонгос, Монгол",
      certifications: "Гэрчилгээ",
      certificationsPlaceholder: "Холбоотой гэрчилгээнүүдээ жагсаална уу...",
      portfolio: "Портфолио",
      motivation: "Менторчлолын уриа",
      motivationPlaceholder: "Ментор болохыг хүсэх шалтгаан юу вэ?",
      cancel: "Цуцлах",
      submitting: "Илгээж байна...",
      submitApplication: "Хүсэлт илгээх",
      applicationError: "Хүсэлт амжилтгүй",
      applicationSubmitted: "Хүсэлт илгээгдлээ!",
      applicationSubmittedMessage:
        "Ментор болох хүсэлтээ амжилттай илгээлээ. Бид үүнийг шалгаад удахгүй танд холбогдох болно.",
      reviewInProgress: "Шалгалт явагдаж байна...",
      mentorApplicationHint: "Ментор болж бусдад тусална уу",

      // New menu translations
      study: "Сургалт",
      life: "Амьдрал",
      community: "Нийгэм",
      mentoring: "Менторчлол",
      aiAssistant: "AI туслах",

      // Home page translations
      heroTitle: "Цогц платформ",
      heroSubtitle: "Солонгос дахь олон улсын оюутнуудад зориулсан",
      heroDescription:
        "Сургалтаас эхлээд өдөр тутмын амьдрал, нийгэм хүртэл. Солонгос дахь сургалтын туршлагыг илүү хялбар, таатай болгоно.",
      getStarted: "Эхлэх",
      exploreServices: "Үйлчилгээг судлах",
      whyEZKorea: "Яагаад EZKorea вэ?",
      customizedService: "Хувийн үйлчилгээ",
      customizedServiceDesc:
        "Олон улсын оюутнуудын бодит хэрэгцээнд тохируулсан үйлчилгээгээр үр дүнтэй тусламж үзүүлнэ.",
      multilingualSupport: "Олон хэл дэмжлэг",
      multilingualSupportDesc:
        "Солонгос, Англи, Монгол хэл дэмжиж, бүх олон улсын оюутнууд хялбар ашиглах боломжтой.",
      communityCentered: "Нийгэм төвтэй",
      communityCenteredDesc:
        "Ижил төрлийн туршлагатай бусад олон улсын оюутнуудтай холбоо тогтоож, мэдээлэл солилцох боломжтой.",

      // Service descriptions
      studyDescription:
        "Хичээл бүртгэлийн заавар, сургалтын хэрэгслүүд, төгсөлтийн шаардлага",
      lifeDescription:
        "Орон сууц хайх, хагас цагийн ажил, тээвэр & холбоо, эмнэлэг & эмийн сан",
      communityDescription:
        "Зарлал, сургуулийн бүлгүүд, клуб & байгууллага, найз хайх",
      freelancerDescription: "Ажлын самбар, төслийн бүртгэл, портфолио",
      mentoringDescription: "Ментор хайх, хичээлийн жагсаалт, 1:1 зөвлөгөө",
      aiAssistantDescription:
        "Чатбот зөвлөгөө, хувийн зөвлөмж, бодит цагийн тусламж",

      // Study section
      courseRegistrationGuide: "Хичээл бүртгэлийн заавар",
      courseRegistrationDescription:
        "Солонгосын их сургуулиудад хичээл бүртгэх арга, зөвлөмжүүдийг сурна уу.",
      academicTools: "Сургалтын хэрэгслүүд",
      academicToolsDescription:
        "GPA тооцоолуур, хуваарийн хэрэгсэл гэх мэт хэрэгтэй хэрэгслүүдийг ашиглана уу.",
      graduationRequirements: "Төгсөлтийн шаардлага",
      graduationRequirementsDescription:
        "Төгсөлтийн шаардлагатай нөхцөлүүдийг шалгаж, удирдана уу.",

      // Life section
      housingSearch: "Орон сууц хайх",
      housingSearchDescription:
        "Дотуур байр, нэг өрөө, гэрт суух гэх мэт олон төрлийн орон сууцны сонголтыг олно уу.",
      partTimeJob: "Хагас цагийн ажил",
      partTimeJobDescription:
        "Олон улсын оюутнуудад тохиромжтой хагас цагийн ажлын мэдээллийг шалгана уу.",
      transportation: "Тээвэр & холбоо",
      transportationDescription:
        "Тээврийн карт, утасны оператор гэх мэт чухал амьдралын мэдээллийг шалгана уу.",
      hospital: "Эмнэлэг & эмийн сан",
      hospitalDescription:
        "Гадаад иргэдэд тохиромжтой эмнэлэг, эмийн сангуудыг олно уу.",

      // Community section
      announcements: "Зарлал",
      announcementsDescription: "Чухал зарлал, шинэчлэлтүүдийг шалгана уу.",
      schoolGroups: "Сургуулийн бүлгүүд",
      schoolGroupsDescription:
        "Ижил сургуулийн оюутнуудтай мэдээлэл солилцож, холбоо тогтооно уу.",
      clubs: "Клуб & байгууллага",
      clubsDescription: "Олон төрлийн клуб, байгууллагад оролцоно уу.",
      findFriends: "Найз хайх",
      findFriendsDescription: "Ижил сонирхолтой найзуудаа олно уу.",
      events: "Арга хэмжээ & уулзалт",
      eventsDescription: "Олон төрлийн арга хэмжээ, уулзалтад оролцоно уу.",

      // Freelancer section
      jobBoard: "Ажлын самбар",
      jobBoardDescription:
        "Орчуулга, устгаарч, багшлах, дизайн гэх мэт олон төрлийн чөлөөт ажлын боломжуудыг олно уу.",
      projectRegistration: "Төслийн бүртгэл",
      projectRegistrationDescription:
        "Төслөө бүртгэж, тохиромжтой чөлөөт ажилчид олно уу.",
      portfolioDescription:
        "Ажлын бүтээлээ үзүүлж, туршлагаа онцлон харуулна уу.",
      contractManagement: "Гэрээ & төлбөрийн удирдлага",
      contractManagementDescription:
        "Аюулгүй эскро системээр аюулгүй наймаа хийнэ үү.",

      // Mentoring section
      findMentorDescription:
        "Танд тохиромжтой менторыг олж, 1:1 зөвлөгөө авна уу.",
      courseList: "Хичээлийн жагсаалт",
      courseListDescription:
        "Солонгос хэл, сургалт, соёл гэх мэт олон төрлийн хичээлүүдийг сурна уу.",
      consultation: "1:1 зөвлөгөө",
      consultationDescription:
        "Хувийн санаа зовниж буй асуудлууд эсвэл асуултуудын талаар менторуудтай зөвлөлцөнө үү.",

      // AI Assistant section
      chatbot: "Чатбот зөвлөгөө",
      chatbotDescription: "Хэзээ ч AI чатботтой зөвлөлцөнө үү, 24/7.",
      personalizedRecommendation: "Хувийн зөвлөмж",
      personalizedRecommendationDescription:
        "AI танд тохиромжтой үйлчилгээг шинжилж, зөвлөмж өгнө.",
      realTimeHelp: "Бодит цагийн тусламж",
      realTimeHelpDescription:
        "Яаралтай нөхцөл байдлын бодит цагийн тусламжийг авна уу.",

      // Common buttons
      useTool: "Хэрэгсэл ашиглах",
      viewChecklist: "Жагсаалт харах",
      viewInfo: "Мэдээлэл харах",
      findHospital: "Эмнэлэг хайх",
      viewAnnouncements: "Зарлал харах",
      findGroups: "Бүлэг хайх",
      viewClubs: "Клуб харах",
      viewEvents: "Арга хэмжээ харах",
      viewBoard: "Самбар харах",
      registerProject: "Төсөл бүртгэх",
      createPortfolio: "Портфолио үүсгэх",
      manageTransactions: "Гүйлгээ удирдах",
      searchMentor: "Ментор хайх",
      viewCourses: "Хичээл харах",
      requestConsultation: "Зөвлөгөө хүсэх",
      startChatbot: "Чатбот эхлүүлэх",
      getRecommendations: "Зөвлөмж авах",
      requestHelp: "Тусламж хүсэх",

      // Page specific translations
      courseRegistrationGuideTitle: "Хичээл бүртгэлийн заавар",
      courseRegistrationGuideDesc:
        "Солонгосын их сургуулиудад хичээл бүртгэх арга, зөвлөмжүүдийг сурна уу.",
      academicToolsTitle: "Сургалтын хэрэгслүүд",
      academicToolsDesc:
        "GPA тооцоолуур, хуваарийн хэрэгсэл гэх мэт хэрэгтэй хэрэгслүүдийг ашиглана уу.",
      graduationRequirementsTitle: "Төгсөлтийн шаардлага",
      graduationRequirementsDesc:
        "Төгсөлтийн шаардлагатай нөхцөлүүдийг шалгаж, удирдана уу.",

      // Life page
      housingSearchTitle: "Орон сууц хайх",
      housingSearchDesc:
        "Дотуур байр, нэг өрөө, гэрт суух гэх мэт олон төрлийн орон сууцны сонголтыг олно уу.",
      partTimeJobTitle: "Хагас цагийн ажил",
      partTimeJobDesc:
        "Олон улсын оюутнуудад тохиромжтой хагас цагийн ажлын мэдээллийг шалгана уу.",
      transportationTitle: "Тээвэр & холбоо",
      transportationDesc:
        "Тээврийн карт, утасны оператор гэх мэт чухал амьдралын мэдээллийг шалгана уу.",
      hospitalTitle: "Эмнэлэг & эмийн сан",
      hospitalDesc:
        "Гадаад иргэдэд тохиромжтой эмнэлэг, эмийн сангуудыг олно уу.",

      // Community page
      announcementsTitle: "Зарлал",
      announcementsDesc: "Чухал зарлал, шинэчлэлтүүдийг шалгана уу.",
      schoolGroupsTitle: "Сургуулийн бүлгүүд",
      schoolGroupsDesc:
        "Ижил сургуулийн оюутнуудтай мэдээлэл солилцож, холбоо тогтооно уу.",
      clubsTitle: "Клуб & байгууллага",
      clubsDesc: "Олон төрлийн клуб, байгууллагад оролцоно уу.",
      findFriendsTitle: "Найз хайх",
      findFriendsDesc: "Ижил сонирхолтой найзуудаа олно уу.",
      eventsTitle: "Арга хэмжээ & уулзалт",
      eventsDesc: "Олон төрлийн арга хэмжээ, уулзалтад оролцоно уу.",

      // Freelancer page
      jobBoardTitle: "Ажлын самбар",
      jobBoardDesc:
        "Орчуулга, устгаарч, багшлах, дизайн гэх мэт олон төрлийн чөлөөт ажлын боломжуудыг олно уу.",
      projectRegistrationTitle: "Төслийн бүртгэл",
      projectRegistrationDesc:
        "Төслөө бүртгэж, тохиромжтой чөлөөт ажилчид олно уу.",
      portfolioTitle: "Портфолио",
      portfolioDesc: "Ажлын бүтээлээ үзүүлж, туршлагаа онцлон харуулна уу.",
      contractManagementTitle: "Гэрээ & төлбөрийн удирдлага",
      contractManagementDesc:
        "Аюулгүй эскро системээр аюулгүй наймаа хийнэ үү.",

      // Mentoring page
      findMentorTitle: "Ментор хайх",
      findMentorDesc: "Танд тохиромжтой менторыг олж, 1:1 зөвлөгөө авна уу.",
      courseListTitle: "Хичээлийн жагсаалт",
      courseListDesc:
        "Солонгос хэл, сургалт, соёл гэх мэт олон төрлийн хичээлүүдийг сурна уу.",
      consultationTitle: "1:1 зөвлөгөө",
      consultationDesc:
        "Хувийн санаа зовниж буй асуудлууд эсвэл асуултуудын талаар менторуудтай зөвлөлцөнө үү.",

      // AI Assistant page
      chatbotTitle: "Чатбот зөвлөгөө",
      chatbotDesc: "Хэзээ ч AI чатботтой зөвлөлцөнө үү, 24/7.",
      personalizedRecommendationTitle: "Хувийн зөвлөмж",
      personalizedRecommendationDesc:
        "AI танд тохиромжтой үйлчилгээг шинжилж, зөвлөмж өгнө.",
      realTimeHelpTitle: "Бодит цагийн тусламж",
      realTimeHelpDesc:
        "Яаралтай нөхцөл байдлын бодит цагийн тусламжийг авна уу.",
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
