// Home.jsx
import React, { useEffect, useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/quote-of-the-day")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setQuote(data[0].q);
          setAuthor(data[0].a);
        } else {
          setQuote("Quote unavailable.");
        }
      })
      .catch(() => setQuote("Could not fetch quote"));
  }, []);

  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to <span className="brand-name">StuddyBuddy</span></h1>
          <p className="tagline">Academic excellence through intelligent technology</p>
          <div className="cta-group">
            <button className="primary-btn" onClick={() => navigate('/signup')}>Get Started</button>
            <button className="secondary-btn" onClick={() => navigate('/login')}>Login</button>
          </div>
        </div>
        <div className="hero-decoration">
          <div className="decoration-line"></div>
          <div className="decoration-dot"></div>
        </div>
      </header>

      <main className="content-section">
        <section className="about-section">
          <div className="section-header">
            <h2>About Our Platform</h2>
            <div className="underline"></div>
          </div>
          <p className="section-content">
            StuddyBuddy revolutionizes learning through AI-powered tools that extract key concepts, 
            organize study materials, and provide intelligent Q&A capabilities. Designed for students 
            and educators seeking efficient knowledge management.
          </p>
        </section>

        <section className="quote-section">
          <div className="section-header">
            <h2>Daily Inspiration</h2>
            <div className="underline"></div>
          </div>
          <div className="quote-content">
            <div className="quote-marks">“</div>
            <blockquote>
              {quote}
              <footer> {author}</footer>
            </blockquote>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;