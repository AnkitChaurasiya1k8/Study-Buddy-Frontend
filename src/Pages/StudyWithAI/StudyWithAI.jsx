import React, { useState } from "react";
import "./StudyWithAI.css";
import axios from "axios";
import { FaFileUpload, FaRobot, FaPaperPlane, FaSearch } from "react-icons/fa";

function StudyWithAI() {
  const baseURL = import.meta.env.VITE_API_BASE_URL
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setAnswer("");
    setError("");
  };

  const handleAsk = async () => {
    if (!file || !question.trim()) {
      setError("Please upload a PDF and enter a question.");
      return;
    }

    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const token = localStorage.getItem("token"); 

      // Upload PDF and get pdf_id
      const formData = new FormData();
      formData.append("pdf", file);

      const uploadRes = await axios.post(
        `${baseURL}/upload-chat-pdf`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const pdfId = uploadRes.data.pdf_id;

      // Ask question with pdf_id
      const chatRes = await axios.post(
        `${baseURL}/chat-with-pdf`,
        {
          question: question,
          pdf_id: pdfId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnswer(chatRes.data.response);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="study-ai-container">
      <div className="study-ai-card">
        <header className="ai-header">
          <FaRobot className="ai-icon" />
          <h1>Study with AI</h1>
          <p className="ai-subtitle">
            Upload your study material and get AI-powered explanations
          </p>
          <div className="header-divider"></div>
        </header>

        <div className="upload-section">
          <label className="file-upload-label">
            <FaFileUpload className="upload-icon" />
            <span>{file ? file.name : "Choose PDF File"}</span>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <div className="search-container">
          <div className="search-box">
            <div className="search-icon">
              <FaSearch />
            </div>
            <input
              type="text"
              placeholder="Ask a question about your study material..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
            />
            <button 
              onClick={handleAsk} 
              disabled={loading || !file || !question.trim()}
              className="search-button"
            >
              {loading ? (
                <span className="loading-text">Analyzing...</span>
              ) : (
                <>
                  <span>Ask</span>
                  <FaPaperPlane className="send-icon" />
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {answer && (
          <div className="ai-response">
            <div className="response-header">
              <FaRobot className="response-icon" />
              <h3>AI Response</h3>
            </div>
            <div className="response-content">
              <p>{answer}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudyWithAI;