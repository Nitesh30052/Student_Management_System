import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import "../styles/settings.css";

function Settings() {

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Get logged-in user
  const storedUser = localStorage.getItem("user");

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Invalid user data:", error);
  }

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {
      alert("New password and confirm password do not match.");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert("New password must be at least 6 characters.");
      return;
    }

    /*
      Backend password update will be connected later.
    */

    alert("Password validation successful.");

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <DashboardLayout>

      <div className="settings-container">

        {/* Page Title */}

        <h2 className="settings-title">
          Settings
        </h2>

        <p className="settings-subtitle">
          Manage your account settings.
        </p>


        {/* ================================
            ACCOUNT INFORMATION
        ================================= */}

        <div className="settings-card">

          <div className="settings-card-header">

            <h4>
              Account Information
            </h4>

            <p>
              Your current account details.
            </p>

          </div>


          <div className="account-details">

            {/* Name */}

            <div className="account-item">

              <div className="account-icon blue">
                <FaUser />
              </div>

              <div>
                <span className="account-label">
                  Full Name
                </span>

                <span className="account-value">
                  {user?.name || "Not available"}
                </span>
              </div>

            </div>


            {/* Email */}

            <div className="account-item">

              <div className="account-icon green">
                <FaEnvelope />
              </div>

              <div>
                <span className="account-label">
                  Email
                </span>

                <span className="account-value">
                  {user?.email || "Not available"}
                </span>
              </div>

            </div>

          </div>

        </div>


        {/* ================================
            CHANGE PASSWORD
        ================================= */}

        <div className="settings-card">

          <div className="settings-card-header">

            <h4>
              Change Password
            </h4>

            <p>
              Update your account password.
            </p>

          </div>


          <form
            onSubmit={handleUpdatePassword}
            className="password-form"
          >

            {/* Current Password */}

            <div className="password-field">

              <label>
                Current Password
              </label>

              <div className="password-input">

                <FaLock />

                <input
                  type={
                    showCurrentPassword
                      ? "text"
                      : "password"
                  }
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowCurrentPassword(
                      !showCurrentPassword
                    )
                  }
                >
                  {showCurrentPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>


            {/* New Password */}

            <div className="password-field">

              <label>
                New Password
              </label>

              <div className="password-input">

                <FaLock />

                <input
                  type={
                    showNewPassword
                      ? "text"
                      : "password"
                  }
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowNewPassword(
                      !showNewPassword
                    )
                  }
                >
                  {showNewPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>


            {/* Confirm Password */}

            <div className="password-field">

              <label>
                Confirm New Password
              </label>

              <div className="password-input">

                <FaLock />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>


            {/* Button */}

            <button
              type="submit"
              className="update-password-btn"
            >
              Update Password
            </button>

          </form>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Settings;