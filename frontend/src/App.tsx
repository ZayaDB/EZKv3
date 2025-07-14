import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginCard from "./components/LoginCard";
import RegisterCard from "./components/RegisterCard";

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Routes>
          <Route path="/login" element={<LoginCard />} />
          <Route path="/register" element={<RegisterCard />} />
          <Route path="/" element={<div>홈 화면</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
