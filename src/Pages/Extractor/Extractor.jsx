import React, { useState } from "react";
import "./Extractor.css";
import axios from "axios";
import { FaUpload, FaChartPie, FaLightbulb } from "react-icons/fa";

function Extractor() {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResults(null);
    setError("");
    setSummary("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please upload a valid PDF file.");
      return;
    }

    setLoading(true);
    setError("");
    setResults(null);
    setSummary("");

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${baseURL}/upload-pyq`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setResults(response.data);

      const topTopic = Object.entries(response.data.topic_counts)?.[0]?.[0];
      const topPercentage = response.data.topic_percentages[topTopic];
      setSummary(`Maximum Weightage Topic: ${topTopic} (${topPercentage})`);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="extractor-container">
      <header className="extractor-header">
        <h1>PYQ Topic Extractor</h1>
        <p className="subtitle">
          Upload past question papers to identify key topics and their weightage
        </p>
        <div className="header-divider"></div>
      </header>

      <div className="upload-section">
        <div className="upload-box">
          <label className="file-upload">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />
            <FaUpload className="upload-icon" />
            <span>{file ? file.name : "Choose PDF File"}</span>
          </label>
          <button
            onClick={handleUpload}
            disabled={loading || !file}
            className="upload-btn"
          >
            {loading ? "Analyzing..." : "Extract Topics"}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
      </div>

      {results && (
        <div className="results-section">
          <div className="section-header">
            <FaChartPie className="section-icon" />
            <h2>Topic Distribution Analysis</h2>
          </div>

          <div className="results-grid">
            {Object.entries(results.topic_counts).map(([topic, count]) => (
              <div key={topic} className="topic-card">
                <div className="topic-header">
                  <h3>{topic}</h3>
                  <span className="topic-percentage">
                    {results.topic_percentages[topic]}
                  </span>
                </div>
                <div className="topic-count">{count} questions</div>
              </div>
            ))}
          </div>

          {summary && (
            <div className="summary-box">
              <div className="highlight-icon">📈</div>
              <div className="highlight-text">{summary}</div>
            </div>
          )}
        </div>
      )}

      <div className="insight-box">
        <FaLightbulb className="insight-icon" />
        <p className="insight-text">
          Focus on high-weightage topics first for efficient exam preparation
        </p>
      </div>
    </div>
  );
}

export default Extractor;
