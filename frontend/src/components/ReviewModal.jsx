import "./ReviewModal.css";
import { useState } from "react";
import { jsPDF } from "jspdf";

function ReviewModal({ review, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!review) return null;

  const copyCode = () => {
    navigator.clipboard.writeText(
      review.feedback?.correctedCode || ""
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const downloadCode = () => {
    const blob = new Blob(
      [review.feedback?.correctedCode || ""],
      {
        type: "text/plain",
      }
    );

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "CorrectedCode.txt";

    a.click();

    window.URL.revokeObjectURL(url);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("AI Code Review Report", 20, 20);

    doc.setFontSize(14);

    doc.text(
      `Score : ${review.feedback?.score || 0}/100`,
      20,
      35
    );

    let y = 50;

    doc.text("Strengths", 20, y);

    review.feedback?.strengths?.forEach((item) => {
      y += 8;
      doc.text(`• ${item}`, 25, y);
    });

    y += 12;

    doc.text("Improvements", 20, y);

    review.feedback?.improvements?.forEach((item) => {
      y += 8;
      doc.text(`• ${item}`, 25, y);
    });

    y += 12;

    doc.text("Interview Questions", 20, y);

    review.feedback?.interviewQuestions?.forEach((item) => {
      y += 8;
      doc.text(`• ${item}`, 25, y);
    });

    y += 12;

    doc.text("Recommended Topics", 20, y);

    review.feedback?.recommendedTopics?.forEach((item) => {
      y += 8;
      doc.text(`• ${item}`, 25, y);
    });

    doc.save("AI_Review_Report.pdf");
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Close Button */}

        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <h2>🤖 AI Review Details</h2>

        <div className="modal-score">
          ⭐ Score :
          <span> {review.feedback?.score || 0}/100</span>
        </div>

        <div className="modal-section">
          <h3>✅ Strengths</h3>

          <ul>
            {review.feedback?.strengths?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="modal-section">
          <h3>⚠️ Improvements</h3>

          <ul>
            {review.feedback?.improvements?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="modal-section">
          <h3>🎯 Interview Questions</h3>

          {review.feedback?.interviewQuestions?.length > 0 ? (
            <ul>
              {review.feedback.interviewQuestions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>No Interview Questions.</p>
          )}
        </div>

        <div className="modal-section">
          <h3>📚 Recommended Topics</h3>

          {review.feedback?.recommendedTopics?.length > 0 ? (
            <ul>
              {review.feedback.recommendedTopics.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>No Recommended Topics.</p>
          )}
        </div>

        <div className="modal-section">

          <div className="code-header">

            <h3>💻 Corrected Code</h3>

            <div className="code-buttons">

              <button
                className="copy-btn"
                onClick={copyCode}
              >
                {copied ? "✅ Copied" : "📋 Copy"}
              </button>

              <button
                className="download-btn"
                onClick={downloadCode}
              >
                📥 Download
              </button>

              <button
                className="pdf-btn"
                onClick={downloadPDF}
              >
                📄 PDF
              </button>

            </div>

          </div>

          <pre>{review.feedback?.correctedCode}</pre>

        </div>

      </div>
    </div>
  );
}

export default ReviewModal;