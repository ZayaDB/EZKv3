import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
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

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      <Header />
      <main className={`flex-1 ${isLoggedIn ? "lg:ml-80" : ""}`}>
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
          <Route path="/" element={<div>홈 화면</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
