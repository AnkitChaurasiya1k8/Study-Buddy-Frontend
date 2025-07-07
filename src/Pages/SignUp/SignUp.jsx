import React, { useState } from "react";
import "./SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function SignUp() {
  const baseURL = import.meta.env.VITE_API_BASE_URL
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, username, email, password } = formData;

    if (!name || !username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await axios.post(`${baseURL}/signup`, formData);
      if (res.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong!");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup-container">
      <div className="signup-decoration">
        <div className="decoration-line"></div>
        <div className="decoration-dot"></div>
      </div>
      
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="section-header">
          <h2>Create an Account</h2>
          <div className="underline"></div>
        </div>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />

        <div className="password-input-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button 
            type="button" 
            className="password-toggle"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {error && <p className="error-msg">{error}</p>}

        <button type="submit" className="primary-btn">Sign Up</button>

        <p className="switch-login">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Log in</span>
        </p>
      </form>
    </div>
  );
}

export default SignUp;