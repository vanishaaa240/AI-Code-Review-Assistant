import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "./Help.css";

function Help() {
  return (
    <div className="home">

      <Navbar />

      <div className="main-layout">

        <Sidebar />

        <div className="content">

          <div className="help-container">

            <h1>❓ Help Center</h1>

            <div className="help-card">

              <h2>🚀 How to use ReviewAI</h2>

              <ol>
                <li>Select your programming language.</li>
                <li>Paste your code in the editor.</li>
                <li>Click <b>Review Code</b>.</li>
                <li>View AI Score, Strengths and Improvements.</li>
                <li>Download corrected code or PDF report.</li>
              </ol>

            </div>

            <div className="help-card">

              <h2>📖 Features</h2>

              <ul>
                <li>AI Code Review</li>
                <li>Code Score</li>
                <li>Corrected Code</li>
                <li>Interview Questions</li>
                <li>Recommended Topics</li>
                <li>History Tracking</li>
                <li>PDF Export</li>
              </ul>

            </div>

            <div className="help-card">

              <h2>❓ Frequently Asked Questions</h2>

              <p><b>Q.</b> Which languages are supported?</p>
              <p>C, C++, Java, Python and JavaScript.</p>

              <br />

              <p><b>Q.</b> Is my review saved?</p>
              <p>Yes. Every review is stored in History.</p>

              <br />

              <p><b>Q.</b> Can I download my corrected code?</p>
              <p>Yes. Download buttons are available.</p>

            </div>

            <div className="help-card">

              <h2>📧 Contact Support</h2>

              <p>Email : support@reviewai.com</p>
              <p>Version : 1.0</p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Help;