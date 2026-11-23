
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./Home.css";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
import Feedback from "../components/Feedback";
import DashboardStats from "../components/DashboardStats";

import {
  reviewCode,
  getStats,
} from "../services/codeReviewService";

function Home() {
  const [language, setLanguage] = useState("C++");
  const [code, setCode] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getStats();
      setStats(data.stats);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReview = async () => {
    if (!code.trim()) {
      toast.warning("Please paste your code first!");
      return;
    }

    try {
      setLoading(true);

      const data = await reviewCode({
        language,
        originalCode: code,
      });

      setFeedback(data.review.feedback);

      await fetchStats();

      toast.success("Code Reviewed Successfully!");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Review Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <Navbar />

      <div className="main-layout">
        <Sidebar />

        <main className="content">

          {/* Welcome Section */}
          <section className="dashboard-heading">
            <div>
              <span className="dashboard-eyebrow">
                ✦ AI-POWERED CODE ANALYSIS
              </span>

              <h1 className="dashboard-title">
                Welcome to <span>ReviewAI</span>
              </h1>

              <p className="dashboard-description">
                Write better code. Find bugs faster.
                Improve your programming skills with AI.
              </p>
            </div>

            <div className="dashboard-status">
              <span className="status-dot"></span>
              AI Engine Ready
            </div>
          </section>

          {/* Dashboard Statistics */}
          <section className="dashboard-stats-section">
            <div className="section-heading">
              <div>
                <h2>Your Overview</h2>
                <p>Track your coding progress</p>
              </div>
            </div>

            <DashboardStats stats={stats} />
          </section>

          {/* Code Editor */}
          <section className="editor-section">
            <div className="section-heading">
              <div>
                <h2>Code Workspace</h2>
                <p>
                  Submit your code and let AI analyze it.
                </p>
              </div>

              <span className="workspace-tag">
                ✦ AI Workspace
              </span>
            </div>

            <Editor
              language={language}
              setLanguage={setLanguage}
              code={code}
              setCode={setCode}
              handleReview={handleReview}
              loading={loading}
            />
          </section>

          {/* AI Feedback */}
          {feedback && (
            <section className="feedback-section">
              <Feedback
                feedback={feedback}
                language={language}
              />
            </section>
          )}

        </main>
      </div>
    </div>
  );
}

export default Home;
