import "./Feedback.css";
import { useState } from "react";
import { jsPDF } from "jspdf";

function Feedback({ feedback, language }) {

  const [copied, setCopied] = useState(false);

  if (!feedback) {
    return (
      <div className="feedback-container">

        <h2>🤖 AI Feedback</h2>

        <p style={{ color: "white" }}>
          Submit your code to get AI feedback.
        </p>

      </div>
    );
  }

  const copyCode = () => {

    navigator.clipboard.writeText(
      feedback.correctedCode || ""
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);

  };

  const downloadCode = () => {

    let extension = "txt";

    switch (language) {

      case "C++":
        extension = "cpp";
        break;

      case "C":
        extension = "c";
        break;

      case "Java":
        extension = "java";
        break;

      case "Python":
        extension = "py";
        break;

      case "JavaScript":
        extension = "js";
        break;

      default:
        extension = "txt";

    }

    const blob = new Blob(
      [feedback.correctedCode || ""],
      {
        type: "text/plain",
      }
    );

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = `CorrectedCode.${extension}`;

    a.click();

    window.URL.revokeObjectURL(url);

  };

  const downloadPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("AI Code Review Report", 20, 20);

    doc.setFontSize(14);

    doc.text(
      `Score : ${feedback.score || 0}/100`,
      20,
      35
    );

    let y = 50;

    doc.text("Strengths", 20, y);

    feedback.strengths?.forEach((item) => {
      y += 8;
      doc.text(`• ${item}`, 25, y);
    });

    y += 12;

    doc.text("Improvements", 20, y);

    feedback.improvements?.forEach((item) => {
      y += 8;
      doc.text(`• ${item}`, 25, y);
    });

    y += 12;

    doc.text("Interview Questions", 20, y);

    feedback.interviewQuestions?.forEach((item) => {
      y += 8;
      doc.text(`• ${item}`, 25, y);
    });

    y += 12;

    doc.text("Recommended Topics", 20, y);

    feedback.recommendedTopics?.forEach((item) => {
      y += 8;
      doc.text(`• ${item}`, 25, y);
    });

    y += 15;

    doc.text("Complexity Analysis", 20, y);

    y += 10;

    doc.text(
      `Time Complexity : ${feedback.timeComplexity || "N/A"}`,
      25,
      y
    );

    y += 8;

    doc.text(
      `Space Complexity : ${feedback.spaceComplexity || "N/A"}`,
      25,
      y
    );

    y += 8;

    doc.text(
      `Difficulty : ${feedback.difficulty || "N/A"}`,
      25,
      y
    );

    doc.save("AI_Code_Review_Report.pdf");

  };

  return (

    <div className="feedback-container">

      <h2>🤖 AI Feedback</h2>
            {/* Score */}

      <div className="score-card">

        <h3>⭐ AI Code Score</h3>

        <div className="score-value">
          {feedback.score || 0}/100
        </div>

        <div className="score-bar">

          <div
            className="score-fill"
            style={{
              width: `${feedback.score || 0}%`,
            }}
          ></div>

        </div>

        <p className="score-text">

          {(feedback.score || 0) >= 90
            ? "🟢 Excellent Code Quality"
            : (feedback.score || 0) >= 75
            ? "🟡 Good Code Quality"
            : (feedback.score || 0) >= 50
            ? "🟠 Average Code Quality"
            : "🔴 Needs Improvement"}

        </p>

      </div>

      {/* Complexity Analysis */}

      <div className="feedback-card complexity-card">

        <h3>⚡ Complexity Analysis</h3>

        <div className="complexity-grid">

          <div className="complexity-item">

            <span>⏱ Time Complexity</span>

            <strong>
              {feedback.timeComplexity || "N/A"}
            </strong>

          </div>

          <div className="complexity-item">

            <span>💾 Space Complexity</span>

            <strong>
              {feedback.spaceComplexity || "N/A"}
            </strong>

          </div>

          <div className="complexity-item">

            <span>🎯 Difficulty</span>

            <strong>
              {feedback.difficulty || "N/A"}
            </strong>

          </div>

        </div>

      </div>

      <div className="feedback-grid">

        {/* Strengths */}

        <div className="feedback-card">

          <h3>✅ Strengths</h3>

          <ul>

            {feedback.strengths?.map((item, index) => (

              <li key={index}>
                {item}
              </li>

            ))}

          </ul>

        </div>

        {/* Improvements */}

        <div className="feedback-card">

          <h3>⚠️ Improvements</h3>

          <ul>

            {feedback.improvements?.map((item, index) => (

              <li key={index}>
                {item}
              </li>

            ))}

          </ul>

        </div>

        {/* Corrected Code */}

        <div className="feedback-card code-card">

          <div className="code-header">

            <h3>💻 Corrected Code</h3>

            <div className="code-buttons">

              <button
                className="copy-btn"
                onClick={copyCode}
              >
                {copied ? "✅ Copied!" : "📋 Copy"}
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

          <pre>
            {feedback.correctedCode}
          </pre>

        </div>
                {/* Interview Questions */}

        <div className="feedback-card">

          <h3>🎯 Interview Questions</h3>

          {feedback.interviewQuestions?.length > 0 ? (

            <ul>

              {feedback.interviewQuestions.map((question, index) => (

                <li key={index}>
                  {question}
                </li>

              ))}

            </ul>

          ) : (

            <p>No interview questions generated.</p>

          )}

        </div>

        {/* Recommended Topics */}

        <div className="feedback-card">

          <h3>📚 Recommended Topics</h3>

          {feedback.recommendedTopics?.length > 0 ? (

            <ul>

              {feedback.recommendedTopics.map((topic, index) => (

                <li key={index}>
                  {topic}
                </li>

              ))}

            </ul>

          ) : (

            <p>No recommendations available.</p>

          )}

        </div>
              </div>

    </div>

  );

}

export default Feedback;