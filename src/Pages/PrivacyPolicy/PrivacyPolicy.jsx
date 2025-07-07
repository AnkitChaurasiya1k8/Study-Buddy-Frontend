import React from "react";
import "./PrivacyPolicy.css";

function PrivacyPolicy() {
  return (
    <div className="privacy-container">
      <div className="privacy-document">
        <header className="document-header">
          <h1>StudyBuddy Privacy Policy</h1>
          <div className="header-meta">
            <span>Effective: June 2025</span>
            <span>Version: 3.2</span>
          </div>
        </header>

        <div className="document-body">
          <section className="document-section">
            <h2>Introduction</h2>
            <p>
              StudyBuddy Technologies ("we," "our," or "us") is committed to protecting the privacy of our users. 
              This Privacy Policy outlines our practices regarding the collection, use, and disclosure of your 
              information when you use our educational platform and services.
            </p>
          </section>

          <section className="document-section">
            <h2>Information Collection and Use</h2>
            <p>
              When you register for StudyBuddy, we collect certain personal information including your full name, 
              email address, and academic credentials. This information enables us to create and manage your 
              account, provide personalized learning experiences, and communicate important service updates.
            </p>
            <p>
              As you use our platform, we collect data regarding your interactions with our learning tools, 
              including documents you upload for analysis and your engagement with our AI features. This usage 
              data helps us improve our services and develop new features tailored to your educational needs.
            </p>
          </section>

          <section className="document-section">
            <h2>Data Security and Protection</h2>
            <p>
              We implement comprehensive security measures to safeguard your information. All data transmissions 
              are encrypted using industry-standard TLS protocols, and we store information in secure facilities 
              with restricted access. Our systems undergo regular security audits and vulnerability testing to 
              maintain the highest protection standards.
            </p>
          </section>

          <section className="document-section">
            <h2>Your Privacy Rights</h2>
            <p>
              You maintain full control over your personal information. At any time, you may request access to 
              the data we hold about you, request corrections to inaccurate information, or ask us to delete 
              your account and associated data. For any privacy-related inquiries or requests, please contact 
              our Data Protection Officer at <a href="mailto:privacy@studybuddy.com">privacy@studybuddy.com</a>.
            </p>
          </section>

          <section className="document-section">
            <h2>Policy Updates</h2>
            <p>
              We periodically review and update this Privacy Policy to reflect changes in our practices or 
              applicable laws. When we make significant changes, we will notify you through our platform and 
              via email. We encourage you to review this policy regularly to stay informed about how we protect 
              your information.
            </p>
          </section>
        </div>

        <footer className="document-footer">
          <p>© 2025 StudyBuddy Technologies. All rights reserved.</p>
          <p>This document was last reviewed and updated on June 1, 2025.</p>
        </footer>
      </div>
    </div>
  );
}

export default PrivacyPolicy;