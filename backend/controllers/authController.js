const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const db = require("../config/db");

// ================================
// REGISTER
// ================================
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required",
            });
        }

        // Check if user already exists
        const existingUser = await db.query(
            "SELECT id FROM users WHERE email = $1",
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const result = await db.query(
            `INSERT INTO users (name, email, password)
             VALUES ($1, $2, $3)
             RETURNING id, name, email`,
            [name, email, hashedPassword]
        );

        res.status(201).json({
            message: "Registration successful",
            user: result.rows[0],
        });

    } catch (error) {
        console.error("Register error:", error);

        res.status(500).json({
            message: "Registration failed",
        });
    }
};


// ================================
// LOGIN
// ================================
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        // Find user
        const result = await db.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const user = result.rows[0];

        // Check password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            message: "Login failed",
        });
    }
};


// ================================
// CHANGE PASSWORD
// ================================
const changePassword = async (req, res) => {
    try {
        const userId = req.user.id;

        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                message: "Current password and new password are required",
            });
        }

        const result = await db.query(
            "SELECT password FROM users WHERE id = $1",
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const user = result.rows[0];

        // Check current password
        const isMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Current password is incorrect",
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        await db.query(
            "UPDATE users SET password = $1 WHERE id = $2",
            [hashedPassword, userId]
        );

        res.status(200).json({
            message: "Password changed successfully",
        });

    } catch (error) {
        console.error("Change password error:", error);

        res.status(500).json({
            message: "Failed to change password",
        });
    }
};


// ================================
// FORGOT PASSWORD
// ================================
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required",
            });
        }

        const result = await db.query(
            "SELECT id FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const userId = result.rows[0].id;

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");

        // Token expiry: 15 minutes
        const resetTokenExpiry = new Date(
            Date.now() + 15 * 60 * 1000
        );

        await db.query(
            `UPDATE users
             SET reset_token = $1,
                 reset_token_expiry = $2
             WHERE id = $3`,
            [resetToken, resetTokenExpiry, userId]
        );

        /*
         * For now, return the token.
         *
         * In production, this token should be
         * sent through email instead.
         */
        res.status(200).json({
            message: "Password reset token generated",
            resetToken,
        });

    } catch (error) {
        console.error("Forgot password error:", error);

        res.status(500).json({
            message: "Failed to process forgot password",
        });
    }
};


// ================================
// RESET PASSWORD
// ================================
const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({
                message: "Token and new password are required",
            });
        }

        const result = await db.query(
            `SELECT id
             FROM users
             WHERE reset_token = $1
             AND reset_token_expiry > NOW()`,
            [token]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({
                message: "Invalid or expired reset token",
            });
        }

        const userId = result.rows[0].id;

        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        await db.query(
            `UPDATE users
             SET password = $1,
                 reset_token = NULL,
                 reset_token_expiry = NULL
             WHERE id = $2`,
            [hashedPassword, userId]
        );

        res.status(200).json({
            message: "Password reset successfully",
        });

    } catch (error) {
        console.error("Reset password error:", error);

        res.status(500).json({
            message: "Failed to reset password",
        });
    }
};


// ================================
// UPDATE PROFILE
// ================================
const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message: "Name and email are required",
            });
        }

        // Check whether another user already has this email
        const existingUser = await db.query(
            `SELECT id
             FROM users
             WHERE email = $1
             AND id != $2`,
            [email, userId]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({
                message: "Email is already in use",
            });
        }

        const result = await db.query(
            `UPDATE users
             SET name = $1,
                 email = $2
             WHERE id = $3
             RETURNING id, name, email`,
            [name, email, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            message: "Profile updated successfully",
            user: result.rows[0],
        });

    } catch (error) {
        console.error("Update profile error:", error);

        res.status(500).json({
            message: "Failed to update profile",
        });
    }
};


// ================================
// EXPORT
// ================================
module.exports = {
    register,
    login,
    changePassword,
    forgotPassword,
    resetPassword,
    updateProfile,
};