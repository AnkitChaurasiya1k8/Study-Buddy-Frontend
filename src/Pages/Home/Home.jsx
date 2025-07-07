import React, { useEffect, useState } from 'react'; 
import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
  const token = localStorage.getItem('token');

  if (token) {
    setIsLoggedIn(true);

    // Fetch user profile from backend
    fetch(`${baseURL}/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.name) {
          setName(data.name);
        }
      })
      .catch((err) => {
        console.error('Error fetching user profile:', err);
      });
  }

  // Fetch quote of the day
  fetch(`${baseURL}/quote-of-the-day`)
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        setQuote(data[0].q);
        setAuthor(data[0].a);
      } else {
        setQuote('The mind is not a vessel to be filled, but a fire to be kindled.'); // If quote not available use this quote
      }
    })
    .catch(() => setQuote('Could not fetch quote'));
}, []);


  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1>
            Welcome to <span className="brand-name">StuddyBuddy</span>
          </h1>
          <p className="tagline">
            Academic excellence through intelligent technology
          </p>

          {/* Logged-in view */}
          {isLoggedIn ? (
            <div className="welcome-card">
              <p className="welcome-text">👋 Welcome back <strong>{name || 'Learner'}</strong>!</p>
              <p className="motivation-text">
                🌟 Stay consistent. Every small step you take adds up to big results!
              </p>
            </div>
          ) : (
            <div className="cta-group">
              <button className="primary-btn" onClick={() => navigate('/signup')}>Get Started</button>
              <button className="secondary-btn" onClick={() => navigate('/login')}>Login</button>
            </div>
          )}
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
              <footer>— {author}</footer>
            </blockquote>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
