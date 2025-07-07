import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import Extractor from "./Pages/Extractor/Extractor";
import StudyWithAI from "./Pages/StudyWithAI/StudyWithAI";
import Resources from "./Pages/Resources/Resources";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import About from "./Pages/About/About";
import Contact from "./Pages/ContactUs/ContactUs";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Profile from "./Pages/Profile/Profile";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/extractor" element={<ProtectedRoute><Extractor /></ProtectedRoute>} />
          <Route path="/studywithai" element={<ProtectedRoute><StudyWithAI /></ProtectedRoute>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;