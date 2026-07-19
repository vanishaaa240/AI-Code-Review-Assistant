const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createReview,
  getHistory,
  deleteReview,
  deleteAllReviews,
  getStats,
} = require("../controllers/codeReviewController");


// Create Review
router.post(
  "/",
  authMiddleware,
  createReview
);


// Dashboard Stats
router.get(
  "/stats",
  authMiddleware,
  getStats
);


// Get Review History
router.get(
  "/history",
  authMiddleware,
  getHistory
);


// Delete All Reviews
router.delete(
  "/delete-all",
  authMiddleware,
  deleteAllReviews
);


// Delete Single Review
router.delete(
  "/:id",
  authMiddleware,
  deleteReview
);


module.exports = router;