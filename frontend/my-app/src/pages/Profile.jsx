import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import {
    FaUser,
    FaEnvelope,
    FaIdCard,
    FaKey,
    FaEdit,
    FaSave,
    FaTimes,
} from "react-icons/fa";

import "../styles/profile.css";

function Profile() {
    const navigate = useNavigate();

    // Get user from localStorage
    const storedUser = localStorage.getItem("user");

    let initialUser = null;

    try {
        initialUser = storedUser
            ? JSON.parse(storedUser)
            : null;
    } catch (error) {
        console.error("Invalid user data:", error);
    }

    const [user, setUser] = useState(initialUser);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(
        initialUser?.name || ""
    );

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // ==========================
    // USER NOT FOUND
    // ==========================

    if (!user) {
        return (
            <DashboardLayout>
                <div className="profile-page">

                    <h2 className="profile-title">
                        My Profile
                    </h2>

                    <div className="alert alert-danger">
                        User information not found.
                    </div>

                </div>
            </DashboardLayout>
        );
    }

    // ==========================
    // EDIT PROFILE
    // ==========================

    const handleEdit = () => {
        setName(user.name);
        setIsEditing(true);
        setMessage("");
        setError("");
    };

    // ==========================
    // CANCEL EDIT
    // ==========================

    const handleCancel = () => {
        setName(user.name);
        setIsEditing(false);
        setMessage("");
        setError("");
    };

    // ==========================
    // UPDATE PROFILE
    // ==========================

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!name.trim()) {
            setError("Name is required.");
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
            "https://student-management-system-30i5.onrender.com/api/auth/profile",
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        name: name.trim(),
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to update profile"
                );
            }

            // Update state
            setUser(data.user);

            // Update localStorage
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            setName(data.user.name);

            setIsEditing(false);

            setMessage(
                "Profile updated successfully!"
            );

        } catch (error) {
            console.error(
                "Update profile error:",
                error
            );

            setError(
                error.message ||
                "Failed to update profile."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>

            <div className="profile-page">

                <h2 className="profile-title">
                    My Profile
                </h2>

                {/* Success Message */}
                {message && (
                    <div className="alert alert-success">
                        {message}
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <div className="profile-card">

                    {/* ==========================
                        NAME
                    ========================== */}

                    <div className="profile-row">

                        <div className="profile-icon">
                            <FaUser />
                        </div>

                        <div className="profile-info">

                            <span className="profile-label">
                                Full Name
                            </span>

                            {isEditing ? (
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) =>
                                        setName(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter your name"
                                />
                            ) : (
                                <span className="profile-value">
                                    {user.name}
                                </span>
                            )}

                        </div>

                    </div>


                    {/* ==========================
                        EMAIL
                    ========================== */}

                    <div className="profile-row">

                        <div className="profile-icon">
                            <FaEnvelope />
                        </div>

                        <div className="profile-info">

                            <span className="profile-label">
                                Email
                            </span>

                            <span className="profile-value">
                                {user.email}
                            </span>

                        </div>

                    </div>


                    {/* ==========================
                        USER ID
                    ========================== */}

                    <div className="profile-row">

                        <div className="profile-icon">
                            <FaIdCard />
                        </div>

                        <div className="profile-info">

                            <span className="profile-label">
                                User ID
                            </span>

                            <span className="profile-value">
                                {user.id}
                            </span>

                        </div>

                    </div>


                    {/* ==========================
                        BUTTONS
                    ========================== */}

                    <div className="profile-actions">

                        {!isEditing ? (

                            <>
                                <button
                                    type="button"
                                    className="edit-profile-btn"
                                    onClick={handleEdit}
                                >
                                    <FaEdit />
                                    Edit Profile
                                </button>

                                <button
                                    type="button"
                                    className="change-password-btn"
                                    onClick={() =>
                                        navigate(
                                            "/change-password"
                                        )
                                    }
                                >
                                    <FaKey />
                                    Change Password
                                </button>
                            </>

                        ) : (

                            <>
                                <button
                                    type="button"
                                    className="save-profile-btn"
                                    onClick={
                                        handleUpdateProfile
                                    }
                                    disabled={loading}
                                >
                                    <FaSave />

                                    {loading
                                        ? "Saving..."
                                        : "Save Changes"}
                                </button>

                                <button
                                    type="button"
                                    className="cancel-profile-btn"
                                    onClick={handleCancel}
                                    disabled={loading}
                                >
                                    <FaTimes />
                                    Cancel
                                </button>
                            </>

                        )}

                    </div>

                </div>

            </div>

        </DashboardLayout>
    );
}

export default Profile;