const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/authController");

const {
  getProfile,
  updateProfile,
} = require("../controllers/profileController");

const authMiddleware = require("../middleware/authMiddleware");

// Signup
router.post("/signup", signup);

// Login
router.post("/login", login);

// Get Profile
router.get("/profile", authMiddleware, getProfile);

// Update Profile
router.put("/profile", authMiddleware, updateProfile);

module.exports = router;