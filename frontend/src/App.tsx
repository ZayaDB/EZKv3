import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LNB from "./components/LNB";
import LoginCard from "./components/LoginCard";
import RegisterCard from "./components/RegisterCard";
import Dashboard from "./components/Dashboard";
import MentorApplicationForm from "./components/MentorApplicationForm";
import AdminDashboard from "./components/AdminDashboard";
import MentorDashboard from "./components/MentorDashboard";
import CourseCreator from "./components/CourseCreator";
import CourseList from "./components/CourseList";
import CourseDetail from "./components/CourseDetail";
import MentorSearch from "./components/MentorSearch";
import Study from "./components/Study";
import Life from "./components/Life";
import Community from "./components/Community";
import Freelancer from "./components/Freelancer";
import Mentoring from "./components/Mentoring";
import AIAssistant from "./components/AIAssistant";
import Home from "./components/Home";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLNB, setShowLNB] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const handleStorageChange = () => {
      const newToken = localStorage.getItem("token");
      setIsLoggedIn(!!newToken);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("loginStateChanged", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("loginStateChanged", handleStorageChange);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header showLNB={showLNB} setShowLNB={setShowLNB} />
      <div className="flex flex-1">
        {isLoggedIn && (
          <LNB isOpen={showLNB} onClose={() => setShowLNB(false)} />
        )}
        <main className="flex-1">
          <Routes>
            <Route path="/login" element={<LoginCard />} />
            <Route path="/register" element={<RegisterCard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/mentor-application"
              element={<MentorApplicationForm />}
            />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/mentor-dashboard" element={<MentorDashboard />} />
            <Route path="/create-course" element={<CourseCreator />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/mentor-search" element={<MentorSearch />} />
            <Route path="/study" element={<Study />} />
            <Route path="/life" element={<Life />} />
            <Route path="/community" element={<Community />} />
            <Route path="/freelancer" element={<Freelancer />} />
            <Route path="/mentoring" element={<Mentoring />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;
