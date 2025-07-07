import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <div className="about-box">
        <div className="section-header">
          <h1>About StudyBuddy</h1>
          <div className="underline"></div>
        </div>
        
        <div className="section-content">
          <p>
            StudyBuddy is your intelligent academic assistant designed to help you
            understand, revise, and explore your subjects more efficiently.
          </p>
          <p>
            From uploading past year papers to analyzing important topics and
            getting AI-powered answers from your PDFs — we streamline your
            learning process with cutting-edge technology.
          </p>
          <p>
            Our mission is to make quality learning accessible, interactive, and
            personalized using modern AI tools.
          </p>
        </div>

        <div className="team-section">
          <div className="section-header">
            <h3>Our Team</h3>
            <div className="underline"></div>
          </div>
          <div className="team-members">
            <div className="team-member">Abhay Bhardwaj</div>
            <div className="team-member">Ankit Kumar</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;