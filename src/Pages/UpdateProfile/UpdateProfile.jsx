import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UpdateProfile.css";
import { MdEdit, MdCheck, MdClose } from "react-icons/md";

function UpdateProfile() {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [formData, setFormData] = useState({ name: "", username: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${baseURL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setFormData({ name: res.data.name, username: res.data.username });
      })
      .catch((err) => {
        setError("Failed to load profile.");
      });
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setSuccess("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put(`${baseURL}/update-profile`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess("Profile updated successfully.");
    } catch (err) {
      setError(err.response?.data?.error || "Update failed.");
    }
  };

  return (
    <div className="update-profile-container">
      <div className="update-profile-card">
        <h2 className="update-profile-title">
          <MdEdit className="edit-icon" />
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="update-form">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <button type="submit" className="save-button">
            <MdCheck /> Save
          </button>
        </form>

        {success && <p className="success-message">{success}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default UpdateProfile;
