const express = require("express");
const router = express.Router();

const {
  createReview,
  getHistory,
  deleteReview,
} = require("../controllers/codeReviewController");

const authMiddleware = require("../middleware/authMiddleware");

// Create Review
router.post("/", authMiddleware, createReview);

// Get Review History
router.get("/history", authMiddleware, getHistory);

// Delete Review
router.delete("/:id", authMiddleware, deleteReview);

module.exports = router;