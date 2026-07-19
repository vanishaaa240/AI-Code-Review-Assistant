const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const codeReviewRoutes = require("./routes/codeReviewRoutes");
const profileRoutes = require("./routes/profileRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("API Running");
});

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/code-review", codeReviewRoutes);

app.use("/api/profile", profileRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});