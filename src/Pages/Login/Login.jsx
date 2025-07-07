import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post(`${baseURL}/login`, formData);
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed!");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-decoration">
        <div className="decoration-line"></div>
        <div className="decoration-dot"></div>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="section-header">
          <h2>Welcome Back</h2>
          <div className="underline"></div>
        </div>

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

        <button type="submit" className="primary-btn">
          Log In
        </button>

        <p className="switch-signup">
          Don&apos;t have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
      </form>
    </div>
  );
}

export default Login;
