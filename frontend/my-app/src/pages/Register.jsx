import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import "../styles/register.css";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // ================================
  // HANDLE INPUT
  // ================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess("");
  };

  // ================================
  // REGISTER
  // ================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Check password match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Check password length
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://student-management-system-30i5.onrender.com/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      // Read response as text first
      const responseText = await response.text();

      console.log("Register response:", responseText);

      let data;

      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        console.error(
          "Server returned non-JSON response:",
          responseText
        );

        throw new Error(
          "Unable to connect to the registration API. Please check that the backend server is running on port 5000."
        );
      }

      // Backend returned an error
      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed."
        );
      }

      // Successful registration
      setSuccess(
        data.message || "User registered successfully."
      );

      // Clear form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Go to login
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.error("Registration error:", error);

      setError(error.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      <div className="register-card">

        {/* TITLE */}

        <h1 className="register-title">
          StudentMS
        </h1>

        <p className="register-subtitle">
          Create your account to continue.
        </p>


        {/* ERROR MESSAGE */}

        {error && (
          <div className="alert alert-danger text-center">
            {error}
          </div>
        )}


        {/* SUCCESS MESSAGE */}

        {success && (
          <div className="alert alert-success text-center">
            {success}
          </div>
        )}


        {/* REGISTER FORM */}

        <form onSubmit={handleSubmit}>

          {/* FULL NAME */}

          <div className="mb-3 text-start">

            <label className="form-label">
              Full Name
            </label>

            <div className="input-group">

              <span className="input-group-text">
                <FaUser />
              </span>

              <input
                type="text"
                className="form-control"
                placeholder="Enter Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          {/* EMAIL */}

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
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          {/* PASSWORD */}

          <div className="mb-3 text-start">

            <label className="form-label">
              Password
            </label>

            <div className="input-group">

              <span className="input-group-text">
                <FaLock />
              </span>

              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
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


          {/* CONFIRM PASSWORD */}

          <div className="mb-3 text-start">

            <label className="form-label">
              Confirm Password
            </label>

            <div className="input-group">

              <span className="input-group-text">
                <FaLock />
              </span>

              <input
                type={showConfirm ? "text" : "password"}
                className="form-control"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  setShowConfirm(!showConfirm)
                }
              >
                {showConfirm ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </span>

            </div>

          </div>


          {/* CREATE ACCOUNT */}

          <button
            type="submit"
            className="btn btn-success btn-register"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>


        {/* LOGIN LINK */}

        <div className="login-link">

          Already have an account?{" "}

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Register;