import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
} from "react-icons/fa";

import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // ==========================
  // HANDLE INPUT CHANGE
  // ==========================

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // HANDLE LOGIN
  // ==========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Check empty fields
    if (
      loginData.email.trim() === "" ||
      loginData.password.trim() === ""
    ) {
      setError("Please fill all fields.");
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(loginData.email.trim())) {
      setError("Please enter a valid email.");
      return;
    }

    setLoading(true);

    try {
      // ==========================
      // LOGIN API
      // ==========================

      const response = await fetch(
        "https://student-management-system-30i5.onrender.com/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: loginData.email.trim(),
            password: loginData.password,
          }),
        }
      );

      // Get response safely
      const data = await response.json();

      // Check backend response
      if (!response.ok) {
        throw new Error(
          data.message || "Login failed."
        );
      }

      // ==========================
      // SAVE JWT TOKEN
      // ==========================

      localStorage.setItem(
        "token",
        data.token
      );

      // ==========================
      // SAVE USER
      // ==========================

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      console.log("Login successful");

      // ==========================
      // GO TO DASHBOARD
      // ==========================

      navigate("/dashboard", {
        replace: true,
      });

    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.message ||
        "Unable to login. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        {/* ==========================
            TITLE
        ========================== */}

        <h1 className="login-title">
          StudentMS
        </h1>

        <p className="login-subtitle">
          Welcome Back!
          <br />
          Sign in to continue managing student records.
        </p>


        <form onSubmit={handleSubmit}>

          {/* ==========================
              ERROR MESSAGE
          ========================== */}

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}


          {/* ==========================
              EMAIL
          ========================== */}

          <div className="mb-3 text-start">

            <label className="form-label">
              Email
            </label>

            <div className="input-group">

              <span className="input-group-text">
                <FaEnvelope />
              </span>

              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          {/* ==========================
              PASSWORD
          ========================== */}

          <div className="mb-3 text-start">

            <label className="form-label">
              Password
            </label>

            <div className="input-group">

              <span className="input-group-text">
                <FaLock />
              </span>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                className="form-control"
                placeholder="Enter Password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                required
              />

              <span
                className="input-group-text"
                style={{
                  cursor: "pointer",
                }}
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </span>

            </div>

          </div>


          {/* ==========================
              FORGOT PASSWORD
          ========================== */}

          <div className="forgot-password">

            <Link to="/forgot-password">
              Forgot Password?
            </Link>

          </div>


          {/* ==========================
              LOGIN BUTTON
          ========================== */}

          <button
            type="submit"
            className="btn btn-primary btn-login"
            disabled={loading}
          >

            {loading ? (
              "Logging in..."
            ) : (
              <>
                <FaSignInAlt className="me-2" />
                Login
              </>
            )}

          </button>

        </form>


        {/* ==========================
            REGISTER
        ========================== */}

        <div className="register-link">

          Don't have an account?{" "}

          <Link to="/register">
            Create Account
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;