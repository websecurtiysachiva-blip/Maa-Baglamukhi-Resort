import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./Login.css";

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "Admin",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await API.post("/auth/login", {
        email: formData.username,
        password: formData.password,
      });

      // Role check (frontend safety)
      if (res.data.role.toLowerCase() !== "admin") {
        alert("Only Admin Allowed");
        localStorage.clear();
        return;
      }

      // Save data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role.toLowerCase());
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("isAuthenticated", "true");

      if (setIsAuthenticated) {
        setIsAuthenticated(true);
      }

      navigate("/dashboard");

    } catch (error) {
      alert(
        error.response?.data?.message || "Invalid Credentials"
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <div className="logo-text">LOGO</div>
          <h1 className="system-title">Hotel Management System</h1>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;