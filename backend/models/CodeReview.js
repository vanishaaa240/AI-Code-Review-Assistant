const mongoose = require("mongoose");

const codeReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    language: {
      type: String,
      required: true,
    },

    originalCode: {
      type: String,
      required: true,
    },

    feedback: {
      score: {
        type: Number,
        default: 0,
      },

      strengths: [
        {
          type: String,
        },
      ],

      improvements: [
        {
          type: String,
        },
      ],

      correctedCode: {
        type: String,
      },

      interviewQuestions: [
        {
          type: String,
        },
      ],

      recommendedTopics: [
        {
          type: String,
        },
      ],

      // NEW: Complexity Analysis

      timeComplexity: {
        type: String,
        default: "",
      },

      spaceComplexity: {
        type: String,
        default: "",
      },

      difficulty: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CodeReview", codeReviewSchema);