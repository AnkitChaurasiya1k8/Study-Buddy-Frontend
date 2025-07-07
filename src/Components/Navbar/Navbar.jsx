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
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className={`Navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="logo" onClick={() => { navigate("/"); closeMenu(); }}>
        <img src={logo} alt="StudyBuddy Logo" />
        <h1>StudyBuddy</h1>
      </div>

      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? <CloseIcon /> : <MenuIcon />}
      </div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li onClick={() => { navigate("/home"); closeMenu(); }}>
          <HomeIcon /> Home
        </li>
        {isAuthenticated && (
          <>
            <li onClick={() => { navigate("/extractor"); closeMenu(); }}>
              <TopicIcon /> Important Topics
            </li>
            <li onClick={() => { navigate("/studywithai"); closeMenu(); }}>
              <AiIcon /> Study with AI
            </li>
          </>
        )}
        <li onClick={() => { navigate("/resources"); closeMenu(); }}>
          <LibraryBooksIcon /> Resources
        </li>
      </ul>

      <div className={`auth-section ${menuOpen ? "open" : ""}`}>
        {isAuthenticated ? (
          <div className="authIcons">
            <button className="icon-btn" title="Profile" onClick={() => { navigate("/profile"); closeMenu(); }}>
              <PersonIcon />
            </button>
            <button className="icon-btn" title="Logout" onClick={handleLogout}>
              <LogoutIcon />
            </button>
          </div>
        ) : (
          <div className="authBtns">
            <button onClick={() => { navigate("/signup"); closeMenu(); }}>Sign Up</button>
            <button onClick={() => { navigate("/login"); closeMenu(); }}>Log In</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
