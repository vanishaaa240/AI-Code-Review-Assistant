const CodeReview = require("../models/CodeReview");
const { reviewCode } = require("../services/aiService");

// ======================
// Create Review
// ======================

const createReview = async (req, res) => {
  try {

    const { language, originalCode } = req.body;

    const userId = req.user.id;

    const feedback = await reviewCode(language, originalCode);

    const review = await CodeReview.create({
      userId,
      language,
      originalCode,
      feedback,
    });

    res.status(201).json({
      success: true,
      message: "Code Reviewed Successfully",
      review,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ======================
// Get Review History
// ======================

const getHistory = async (req, res) => {

  try {

    const userId = req.user.id;

    const reviews = await CodeReview.find({
      userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      reviews,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

// ======================
// Delete Single Review
// ======================

const deleteReview = async (req, res) => {

  try {

    const { id } = req.params;

    const review = await CodeReview.findOne({
      _id: id,
      userId: req.user.id,
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    await review.deleteOne();

    res.status(200).json({
      success: true,
      message: "Review Deleted Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

// ======================
// Delete All Reviews
// ======================

const deleteAllReviews = async (req, res) => {

  try {

    const userId = req.user.id;

    await CodeReview.deleteMany({
      userId,
    });

    res.status(200).json({
      success: true,
      message: "All Reviews Deleted Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

// ======================
// Dashboard Statistics
// ======================

const getStats = async (req, res) => {

  try {

    const userId = req.user.id;

    const reviews = await CodeReview.find({
      userId,
    });

    const totalReviews = reviews.length;

    const averageScore =
      totalReviews === 0
        ? 0
        : Math.round(
            reviews.reduce(
              (sum, review) =>
                sum + (review.feedback?.score || 0),
              0
            ) / totalReviews
          );

    const highestScore =
      totalReviews === 0
        ? 0
        : Math.max(
            ...reviews.map(
              (review) => review.feedback?.score || 0
            )
          );

    const languageCount = {};

    reviews.forEach((review) => {

      languageCount[review.language] =
        (languageCount[review.language] || 0) + 1;

    });

    let favoriteLanguage = "N/A";

    if (Object.keys(languageCount).length > 0) {

      favoriteLanguage = Object.keys(languageCount).reduce(
        (a, b) =>
          languageCount[a] > languageCount[b]
            ? a
            : b
      );

    }

    const today = new Date().toDateString();

    const todayReviews = reviews.filter(
      (review) =>
        new Date(review.createdAt).toDateString() === today
    ).length;

    res.status(200).json({

      success: true,

      stats: {

        totalReviews,

        averageScore,

        highestScore,

        favoriteLanguage,

        todayReviews,

      },

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

module.exports = {

  createReview,

  getHistory,

  deleteReview,

  deleteAllReviews,

  getStats,

};