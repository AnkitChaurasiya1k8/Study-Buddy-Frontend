import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import { FaUser, FaCalendarAlt, FaHistory, FaEnvelope } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";

function Profile() {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", username: "" });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Not authenticated.");
      setLoading(false);
      return;
    }

    axios
      .get(`${baseURL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserData(res.data);
        setFormData({ name: res.data.name, username: res.data.username });
      })
      .catch((err) => {
        setError(err.response?.data?.error || "Something went wrong!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
    setSuccessMessage("");
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `${baseURL}/update-profile`,
        {
          name: formData.name,
          username: formData.username,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage("Profile updated successfully!");
      setUserData({ ...userData, ...formData });
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update profile");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <header className="profile-header">
          <MdAccountCircle className="profile-icon" />
          <h1>My Profile</h1>
          <div className="header-divider"></div>
        </header>

        {error && <div className="error-message">{error}</div>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        {loading ? (
          <div className="loading-spinner"></div>
        ) : userData ? (
          <div className="profile-content">
            <section className="profile-section">
              <div className="info-item">
                <FaUser className="info-icon" />
                <div className="info-content">
                  <span className="info-label">Name</span>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  ) : (
                    <span className="info-value">{userData.name}</span>
                  )}
                </div>
              </div>

              <div className="info-item">
                <FaUser className="info-icon" />
                <div className="info-content">
                  <span className="info-label">Username</span>
                  {isEditing ? (
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  ) : (
                    <span className="info-value">{userData.username}</span>
                  )}
                </div>
              </div>

              <div className="info-item">
                <FaEnvelope className="info-icon" />
                <div className="info-content">
                  <span className="info-label">Email</span>
                  <span className="info-value">{userData.email}</span>
                </div>
              </div>

              <div className="info-item">
                <FaCalendarAlt className="info-icon" />
                <div className="info-content">
                  <span className="info-label">Member Since</span>
                  <span className="info-value">
                    {new Date(
                      userData.created_at?.$date || userData.created_at
                    ).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <div className="button-group">
                {isEditing ? (
                  <>
                    <button className="btn save-btn" onClick={handleProfileUpdate}>
                      Save Changes
                    </button>
                    <button className="btn cancel-btn" onClick={handleEditToggle}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button className="btn edit-btn" onClick={handleEditToggle}>
                    Update Profile
                  </button>
                )}
              </div>
            </section>

            <section className="activity-section">
              <div className="section-header">
                <FaHistory className="section-icon" />
                <h2>Recent Activity</h2>
              </div>

              {userData.chat_history?.length > 0 ? (
                <ul className="activity-list">
                  {userData.chat_history
                    .slice(-5)
                    .reverse()
                    .map((entry, index) => (
                      <li key={index} className="activity-item">
                        <div className="activity-bullet"></div>
                        <div className="activity-text">{entry}</div>
                      </li>
                    ))}
                </ul>
              ) : (
                <p className="no-activity">No recent activity yet</p>
              )}
            </section>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Profile;
