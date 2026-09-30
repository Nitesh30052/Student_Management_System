import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    FaLock,
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";

function ResetPassword() {

    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!email) {
            setError(
                "Email information is missing. Please start again."
            );
            return;
        }

        if (!newPassword || !confirmPassword) {
            setError("Please fill all fields.");
            return;
        }

        if (newPassword.length < 6) {
            setError(
                "Password must be at least 6 characters."
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {

            const response = await fetch(
                "http://localhost:5000/api/auth/reset-password",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        newPassword: newPassword,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to reset password."
                );
            }

            alert("Password reset successfully!");

            navigate("/login");

        } catch (error) {

            console.error(
                "Reset password error:",
                error
            );

            setError(
                error.message ||
                "Something went wrong."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-page">

            <div className="forgot-card">

                <h2 className="forgot-title">
                    Reset Password
                </h2>

                <p className="forgot-subtitle">
                    Create a new password for your account.
                </p>

                {email && (
                    <p className="text-muted text-center">
                        {email}
                    </p>
                )}

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    {/* New Password */}

                    <label className="form-label">
                        New Password
                    </label>

                    <div className="input-group mb-3">

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
                            placeholder="Enter New Password"
                            value={newPassword}
                            onChange={(e) =>
                                setNewPassword(
                                    e.target.value
                                )
                            }
                            required
                        />

                        <span
                            className="input-group-text"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                        >
                            {showPassword
                                ? <FaEyeSlash />
                                : <FaEye />
                            }
                        </span>

                    </div>


                    {/* Confirm Password */}

                    <label className="form-label">
                        Confirm Password
                    </label>

                    <div className="input-group mb-4">

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
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(
                                    e.target.value
                                )
                            }
                            required
                        />

                        <span
                            className="input-group-text"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                                setShowConfirm(
                                    !showConfirm
                                )
                            }
                        >
                            {showConfirm
                                ? <FaEyeSlash />
                                : <FaEye />
                            }
                        </span>

                    </div>


                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >
                        {loading
                            ? "Resetting..."
                            : "Reset Password"}
                    </button>

                </form>

                <div className="text-center mt-4">

                    <Link to="/login">
                        Back to Login
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default ResetPassword;