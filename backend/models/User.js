const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  // Avatar Image
  avatar: {
    type: String,
    default: "/avatars/avatar1.png",
  },

  // About Me
  about: {
    type: String,
    default: "",
  },

  // Achievements
  achievements: {
    type: [String],
    default: [],
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model("User", userSchema);