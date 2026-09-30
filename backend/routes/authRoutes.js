const express = require("express");

const router = express.Router();

const {
    register,
    login,
    changePassword,
    forgotPassword,
    resetPassword,
    updateProfile,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");


// ==========================
// REGISTER
// ==========================

router.post(
    "/register",
    register
);


// ==========================
// LOGIN
// ==========================

router.post(
    "/login",
    login
);


// ==========================
// CHANGE PASSWORD
// ==========================

router.put(
    "/change-password",
    authMiddleware,
    changePassword
);


// ==========================
// FORGOT PASSWORD
// ==========================

router.post(
    "/forgot-password",
    forgotPassword
);


// ==========================
// RESET PASSWORD
// ==========================

router.put(
    "/reset-password",
    resetPassword
);


// ==========================
// UPDATE PROFILE
// ==========================

router.put(
    "/profile",
    authMiddleware,
    updateProfile
);


module.exports = router;