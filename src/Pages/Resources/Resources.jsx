import React, { useEffect, useState } from "react";
import "./Resources.css";
import axios from "axios";
import { FaBook, FaYoutube, FaLightbulb } from "react-icons/fa";

function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchResources() {
      try {
        const res = await axios.get("http://localhost:5000/resources");
        setResources(res.data.resources);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Failed to load resources. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchResources();
  }, []);

  if (loading) return (
    <div className="resources-loading">
      <div className="loading-spinner"></div>
      <p>Loading educational resources...</p>
    </div>
  );

  if (error) return <div className="resources-error">{error}</div>;

  return (
    <div className="resources-container">
      <header className="resources-header">
        <h1>Study Resources</h1>
        <p className="subtitle">Curated academic materials to support your learning journey</p>
        <div className="header-divider"></div>
      </header>

      <main className="resources-content">
        {resources.map((subjectRes, idx) => (
          <article key={idx} className="resource-card">
            <h2 className="subject-title">{subjectRes.subject}</h2>
            
            <section className="resource-section">
              <div className="section-header">
                <FaYoutube className="section-icon" />
                <h3>Video Playlists</h3>
              </div>
              <ul className="resource-list">
                {subjectRes.playlists.map((pl, i) => (
                  <li key={i}>
                    <a href={pl.url} target="_blank" rel="noopener noreferrer" className="resource-link">
                      {pl.title}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className="resource-section">
              <div className="section-header">
                <FaBook className="section-icon" />
                <h3>Recommended Books</h3>
              </div>
              <ul className="resource-list books-list">
                {subjectRes.books.map((bk, i) => (
                  <li key={i} className="book-item">
                    {bk.url ? (
                      <a href={bk.url} target="_blank" rel="noopener noreferrer" className="book-link">
                        <span className="book-title">{bk.title}</span>
                        <span className="book-author">by {bk.author}</span>
                      </a>
                    ) : (
                      <>
                        <span className="book-title">{bk.title}</span>
                        <span className="book-author">by {bk.author}</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            <section className="resource-section">
              <div className="section-header">
                <FaLightbulb className="section-icon" />
                <h3>Learning Tips</h3>
              </div>
              <ul className="resource-list">
                {subjectRes.suggestions.map((sugg, i) => (
                  <li key={i} className="suggestion-item">{sugg}</li>
                ))}
              </ul>
            </section>
          </article>
        ))}
      </main>
    </div>
  );
}

export default Resources;