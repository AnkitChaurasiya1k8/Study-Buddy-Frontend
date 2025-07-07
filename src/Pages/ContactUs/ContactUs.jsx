import React from "react";
import "./ContactUs.css";

function ContactUs() {
  return (
    <div className="contact-container">
      <div className="contact-box">
        <div className="section-header">
          <h1>Contact Us</h1>
          <div className="underline"></div>
        </div>
        
        <p className="intro-text">
          Have questions, feedback, or need support? We're here to help.
        </p>

        <div className="contact-info">
          <div className="section-header">
            <h3>Reach out to the Team</h3>
            <div className="underline"></div>
          </div>
          <div className="contact-list">
            <div className="contact-item">
              <span className="contact-name">Abhay Bhardwaj</span>
              <a href="mailto:abhayb@gmail.com" className="contact-email">
                abhayb@gmail.com
              </a>
            </div>
            <div className="contact-item">
              <span className="contact-name">Ankit Kumar</span>
              <a href="mailto:ankitk@gmail.com" className="contact-email">
                ankitk@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="contact-note">
          <p>We typically respond within 24-48 working hours.</p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;