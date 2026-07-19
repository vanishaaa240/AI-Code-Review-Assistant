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

      fetchStats();

      toast.success("Code Reviewed Successfully!");

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Review Failed"
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

        <div className="content">

          <DashboardStats stats={stats} />

          <Editor
            language={language}
            setLanguage={setLanguage}
            code={code}
            setCode={setCode}
            handleReview={handleReview}
            loading={loading}
          />

          <Feedback
            feedback={feedback}
            language={language}
          />

        </div>

      </div>

    </div>
  );
}

export default Home;