import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext"; 

import HomeIcon from "@mui/icons-material/Home";
import TopicIcon from "@mui/icons-material/Lightbulb";
import AiIcon from "@mui/icons-material/SmartToy";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth(); 
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout(); 
    navigate("/login");
  };

  return (
    <div className={`Navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="logo" onClick={() => navigate("/")}>
        <img src={logo} alt="StudyBuddy Logo" />
        <h1>StudyBuddy</h1>
      </div>

      <ul className="nav-links">
        <li onClick={() => navigate("/home")}>
          <HomeIcon /> Home
        </li>

        {isAuthenticated && (
          <>
            <li onClick={() => navigate("/extractor")}>
              <TopicIcon /> Important Topics
            </li>
            <li onClick={() => navigate("/studywithai")}>
              <AiIcon /> Study with AI
            </li>
          </>
        )}

        <li onClick={() => navigate("/resources")}>
          <LibraryBooksIcon /> Resources
        </li>
      </ul>

      <div className="auth-section">
        {isAuthenticated ? (
          <div className="authIcons">
            <button
              className="icon-btn"
              title="Profile"
              onClick={() => navigate("/profile")}
            >
              <PersonIcon />
            </button>
            <button className="icon-btn" title="Logout" onClick={handleLogout}>
              <LogoutIcon />
            </button>
          </div>
        ) : (
          <div className="authBtns">
            <button onClick={() => navigate("/signup")}>Sign Up</button>
            <button onClick={() => navigate("/login")}>Log In</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
