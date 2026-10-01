import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaKey,
} from "react-icons/fa";

import "../styles/changePassword.css";

function ChangePassword() {
  const navigate = useNavigate();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = formData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill all fields.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      setError(
        "New password must be different from current password."
      );
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        setError("You are not logged in.");
        return;
      }

      const response = await fetch(
        "https://student-management-system-30i5.onrender.com/api/auth/change-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to change password."
        );
      }

      setSuccess(
        "Password changed successfully!"
      );

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (error) {
      console.error("Change password error:", error);
      setError(
        error.message ||
        "Unable to change password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>

      <div className="change-password-page">

        <h2 className="change-password-title">
          Change Password
        </h2>

        <div className="change-password-card">

          <div className="change-password-icon">
            <FaKey />
          </div>

          <p className="change-password-subtitle">
            Update your account password securely.
          </p>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Current Password */}
            <div className="mb-3 text-start">

              <label className="form-label">
                Current Password
              </label>

              <div className="input-group">

                <span className="input-group-text">
                  <FaLock />
                </span>

                <input
                  type={
                    showCurrent
                      ? "text"
                      : "password"
                  }
                  className="form-control"
                  placeholder="Enter current password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                />

                <span
                  className="input-group-text password-eye"
                  onClick={() =>
                    setShowCurrent(!showCurrent)
                  }
                >
                  {showCurrent ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </span>

              </div>

            </div>

            {/* New Password */}
            <div className="mb-3 text-start">

              <label className="form-label">
                New Password
              </label>

              <div className="input-group">

                <span className="input-group-text">
                  <FaLock />
                </span>

                <input
                  type={
                    showNew
                      ? "text"
                      : "password"
                  }
                  className="form-control"
                  placeholder="Enter new password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                />

                <span
                  className="input-group-text password-eye"
                  onClick={() =>
                    setShowNew(!showNew)
                  }
                >
                  {showNew ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </span>

              </div>

            </div>

            {/* Confirm Password */}
            <div className="mb-4 text-start">

              <label className="form-label">
                Confirm New Password
              </label>

              <div className="input-group">

                <span className="input-group-text">
                  <FaLock />
                </span>

                <input
                  type={
                    showConfirm
                      ? "text"
                      : "password"
                  }
                  className="form-control"
                  placeholder="Confirm new password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />

                <span
                  className="input-group-text password-eye"
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

            <div className="change-password-buttons">

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/profile")}
              >
                Back to Profile
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading
                  ? "Changing..."
                  : "Change Password"}
              </button>

            </div>

          </form>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default ChangePassword;