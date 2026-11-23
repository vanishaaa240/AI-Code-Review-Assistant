
import { useEffect, useState } from "react";
import { getHistory, deleteReview } from "../services/codeReviewService";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ReviewModal from "../components/ReviewModal";

import "./History.css";

function History() {
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await getHistory();
      setReviews(data.reviews || []);
    } catch (error) {
      console.error("Failed to fetch history:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this code review?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      await deleteReview(id);
      setReviews((prev) => prev.filter((review) => review._id !== id));

      if (selectedReview?._id === id) {
        setSelectedReview(null);
      }
    } catch (error) {
      console.error("Failed to delete review:", error);
      alert("Failed to delete review. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredReviews = reviews.filter((review) =>
    (review.language || "").toLowerCase().includes(search.toLowerCase())
  );

  const averageScore =
    reviews.length > 0
      ? Math.round(
          reviews.reduce(
            (total, review) => total + (review.feedback?.score || 0),
            0
          ) / reviews.length
        )
      : 0;

  const getScoreClass = (score) => {
    if (score >= 80) return "score-high";
    if (score >= 50) return "score-medium";
    return "score-low";
  };

  return (
    <div className="home">
      <Navbar />

      <div className="main-layout">
        <Sidebar />

        <main className="content">
          <div className="history-container">

            <div className="history-heading">
              <div>
                <span className="history-eyebrow">YOUR ACTIVITY</span>
                <h1>Review History</h1>
                <p>
                  Revisit your previous code reviews and track your progress.
                </p>
              </div>

              <div className="history-heading-icon">◷</div>
            </div>

            <div className="history-stats">
              <div className="history-stat-card">
                <div className="history-stat-icon purple-icon">⌘</div>
                <div>
                  <span>Total Reviews</span>
                  <h2>{reviews.length}</h2>
                </div>
              </div>

              <div className="history-stat-card">
                <div className="history-stat-icon blue-icon">✧</div>
                <div>
                  <span>Average Score</span>
                  <h2>{averageScore}<small>/100</small></h2>
                </div>
              </div>

              <div className="history-stat-card">
                <div className="history-stat-icon green-icon">✓</div>
                <div>
                  <span>Languages Used</span>
                  <h2>
                    {new Set(reviews.map((review) => review.language)).size}
                  </h2>
                </div>
              </div>
            </div>

            <div className="history-toolbar">
              <div>
                <h2>Previous Reviews</h2>
                <p>{filteredReviews.length} reviews found</p>
              </div>

              <div className="history-search-wrapper">
                <span>⌕</span>
                <input
                  type="text"
                  className="search-box"
                  placeholder="Search by language..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <button
                    type="button"
                    className="clear-search"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {loading ? (
              <div className="history-empty-state">
                <div className="history-empty-icon">◌</div>
                <h3>Loading your reviews...</h3>
                <p>Please wait while we retrieve your history.</p>
              </div>
            ) : reviews.length === 0 ? (
              <div className="history-empty-state">
                <div className="history-empty-icon">⌘</div>
                <h3>No reviews yet</h3>
                <p>Your code review history will appear here after your first analysis.</p>
              </div>
            ) : filteredReviews.length === 0 ? (
              <div className="history-empty-state">
                <div className="history-empty-icon">⌕</div>
                <h3>No matching reviews</h3>
                <p>Try searching with a different programming language.</p>
                <button
                  className="history-reset-btn"
                  onClick={() => setSearch("")}
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="history-grid">
                {filteredReviews.map((review) => {
                  const score = review.feedback?.score || 0;

                  return (
                    <article className="history-card" key={review._id}>
                      <div className="history-card-top">
                        <span className="language-badge">
                          {review.language}
                        </span>

                        <span className={`score-badge ${getScoreClass(score)}`}>
                          ✦ {score}/100
                        </span>
                      </div>

                      <div className="history-card-title">
                        <h3>{review.language} Code Review</h3>
                        <span>AI Analysis</span>
                      </div>

                      <p className="code-preview">
                        {(review.originalCode || "").substring(0, 180)}
                        {(review.originalCode || "").length > 180 ? "..." : ""}
                      </p>

                      <div className="history-card-footer">
                        <span className="review-date">
                          ◷ {new Date(review.createdAt).toLocaleString()}
                        </span>

                        <div className="card-buttons">
                          <button
                            className="view-btn"
                            onClick={() => setSelectedReview(review)}
                          >
                            View Review ↗
                          </button>

                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(review._id)}
                            disabled={deletingId === review._id}
                            aria-label="Delete review"
                            title="Delete review"
                          >
                            {deletingId === review._id ? "..." : "×"}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

          </div>
        </main>
      </div>

      <ReviewModal
        review={selectedReview}
        onClose={() => setSelectedReview(null)}
      />
    </div>
  );
}

export default History;
