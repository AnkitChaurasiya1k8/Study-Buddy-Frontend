import React from 'react';
import './Footer.css';
import { useNavigate } from 'react-router-dom';
import { FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-left" onClick={() => navigate('/')}>
        <h2>StuddyBuddy</h2>
      </div>

      <div className="footer-center">
        <span onClick={() => navigate('/about')}>About</span>
        <span onClick={() => navigate('/contact')}>Contact Us</span>
        <span onClick={() => navigate('/privacypolicy')}>Privacy Policy</span>
      </div>

      <div className="footer-right">
        <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin /></a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
      </div>
    </footer>
  );
}

export default Footer;
