const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ==========================
// REGISTER
// ==========================

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required",
            });
        }

        const [existingUser] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (existingUser.length > 0) {
            return res.status(409).json({
                message: "Email already registered",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            `INSERT INTO users (name, email, password)
             VALUES (?, ?, ?)`,
            [name, email, hashedPassword]
        );

        res.status(201).json({
            message: "User registered successfully",
            userId: result.insertId,
        });

    } catch (error) {
        console.error("Register error:", error);

        res.status(500).json({
            message: "Failed to register user",
        });
    }
};


// ==========================
// LOGIN
// ==========================

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        const [users] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const user = users[0];

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

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

            token: token,

            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            message: "Failed to login",
        });
    }
};


// ==========================
// CHANGE PASSWORD
// ==========================

const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                message:
                    "Current password and new password are required",
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                message:
                    "New password must be at least 6 characters",
            });
        }

        const userId = req.user.id;

        const [users] = await db.query(
            "SELECT * FROM users WHERE id = ?",
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const user = users[0];

        const passwordMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Current password is incorrect",
            });
        }

        const samePassword = await bcrypt.compare(
            newPassword,
            user.password
        );

        if (samePassword) {
            return res.status(400).json({
                message:
                    "New password must be different from current password",
            });
        }

        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        await db.query(
            "UPDATE users SET password = ? WHERE id = ?",
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


// ==========================
// FORGOT PASSWORD
// ==========================

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required",
            });
        }

        const [users] = await db.query(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (users.length === 0) {
            return res.status(404).json({
                message: "No account found with this email",
            });
        }

        res.status(200).json({
            message: "Email verified successfully",
        });

    } catch (error) {
        console.error("Forgot password error:", error);

        res.status(500).json({
            message: "Failed to verify email",
        });
    }
};


// ==========================
// RESET PASSWORD
// ==========================

const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            return res.status(400).json({
                message:
                    "Email and new password are required",
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                message:
                    "New password must be at least 6 characters",
            });
        }

        const [users] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (users.length === 0) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const user = users[0];

        const samePassword = await bcrypt.compare(
            newPassword,
            user.password
        );

        if (samePassword) {
            return res.status(400).json({
                message:
                    "New password must be different from current password",
            });
        }

        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        await db.query(
            "UPDATE users SET password = ? WHERE id = ?",
            [hashedPassword, user.id]
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


// ==========================
// UPDATE PROFILE
// ==========================

const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name } = req.body;

        // Check name
        if (!name || !name.trim()) {
            return res.status(400).json({
                message: "Name is required",
            });
        }

        // Get current user
        const [users] = await db.query(
            "SELECT id, name, email FROM users WHERE id = ?",
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Update name
        await db.query(
            "UPDATE users SET name = ? WHERE id = ?",
            [name.trim(), userId]
        );

        // Get updated user
        const [updatedUsers] = await db.query(
            "SELECT id, name, email FROM users WHERE id = ?",
            [userId]
        );

        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUsers[0],
        });

    } catch (error) {
        console.error("Update profile error:", error);

        res.status(500).json({
            message: "Failed to update profile",
        });
    }
};


// ==========================
// EXPORT
// ==========================

module.exports = {
    register,
    login,
    changePassword,
    forgotPassword,
    resetPassword,
    updateProfile,
};