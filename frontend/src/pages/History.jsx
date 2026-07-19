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

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await getHistory();
      setReviews(data.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteReview(id);
      fetchHistory();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home">

      <Navbar />

      <div className="main-layout">

        <Sidebar />

        <div className="content">

          <div className="history-container">

            <h1>📜 Review History</h1>

            <input
              type="text"
              className="search-box"
              placeholder="🔍 Search by language..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {reviews.length === 0 ? (

              <p>No reviews found.</p>

            ) : (

              reviews
                .filter((review) =>
                  review.language
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((review) => (

                  <div
                    className="history-card"
                    key={review._id}
                  >

                    <div className="card-top">

                      <span className="language-badge">
                        {review.language}
                      </span>

                      <span className="score-badge">
                        ⭐ {review.feedback?.score || 0}/100
                      </span>

                    </div>

                    <p className="code-preview">
                      {review.originalCode.substring(0, 150)}...
                    </p>

                    <p className="review-date">
                      📅 {new Date(review.createdAt).toLocaleString()}
                    </p>

                    <div className="card-buttons">

                      <button
                        className="view-btn"
                        onClick={() =>
                          setSelectedReview(review)
                        }
                      >
                        👁 View
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(review._id)
                        }
                      >
                        🗑 Delete
                      </button>

                    </div>

                  </div>

                ))

            )}

          </div>

        </div>

      </div>

      <ReviewModal
        review={selectedReview}
        onClose={() => setSelectedReview(null)}
      />

    </div>
  );
}

export default History;