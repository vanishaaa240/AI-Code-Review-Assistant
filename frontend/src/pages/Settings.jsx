
import "./Settings.css";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { ThemeContext } from "../context/ThemeContext";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser({
        name: res.data.name,
        email: res.data.email,
      });
    } catch (error) {
      console.log("Failed to fetch user:", error);
      toast.error("Unable to load account information");
    }
  };

  const clearHistory = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete ALL your code review history?\n\nThis action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/code-review/delete-all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("All review history deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete review history");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const languages = [
    "C",
    "C++",
    "Java",
    "Python",
    "JavaScript",
  ];

  return (
    <div className="home">
      <Navbar />

      <div className="main-layout">
        <Sidebar />

        <div className="content">
          <div className="settings-container">

            {/* Page Header */}
            <div className="settings-header">
              <div>
                <span className="settings-eyebrow">
                  PERSONALIZE YOUR EXPERIENCE
                </span>

                <h1>Settings</h1>

                <p>
                  Manage your account, appearance, and AI preferences.
                </p>
              </div>

              <div className="settings-header-icon">
                ⚙️
              </div>
            </div>

            {/* Account Section */}
            <section className="settings-section">
              <div className="settings-section-heading">
                <span className="settings-icon">👤</span>
                <div>
                  <h2>Account Information</h2>
                  <p>Your personal account details</p>
                </div>
              </div>

              <div className="setting-card account-card">
                <div className="account-avatar">
                  {user.name
                    ? user.name.charAt(0).toUpperCase()
                    : "U"}
                </div>

                <div className="account-details">
                  <div className="account-field">
                    <span>FULL NAME</span>
                    <strong>{user.name || "Loading..."}</strong>
                  </div>

                  <div className="account-field">
                    <span>EMAIL ADDRESS</span>
                    <strong>{user.email || "Loading..."}</strong>
                  </div>
                </div>

                <span className="account-status">
                  ● Active
                </span>
              </div>
            </section>

            {/* Appearance Section */}
            <section className="settings-section">
              <div className="settings-section-heading">
                <span className="settings-icon">🎨</span>
                <div>
                  <h2>Appearance</h2>
                  <p>Customize how ReviewAI looks</p>
                </div>
              </div>

              <div className="setting-card appearance-card">
                <div className="setting-info">
                  <h3>Theme Preference</h3>
                  <p>
                    Choose the appearance that feels comfortable for you.
                  </p>

                  <span className="current-theme">
                    Current theme: {theme.toUpperCase()}
                  </span>
                </div>

                <button
                  className="theme-setting-btn"
                  onClick={toggleTheme}
                >
                  {theme === "dark"
                    ? "☀️ Switch to Light"
                    : "🌙 Switch to Dark"}
                </button>
              </div>
            </section>

            {/* AI Settings */}
            <section className="settings-section">
              <div className="settings-section-heading">
                <span className="settings-icon">🤖</span>
                <div>
                  <h2>AI Configuration</h2>
                  <p>Information about your code review engine</p>
                </div>
              </div>

              <div className="setting-card ai-settings-card">
                <div className="ai-model-info">
                  <div className="ai-model-icon">✦</div>

                  <div>
                    <span className="ai-label">POWERED BY GROQ</span>
                    <h3>GPT-OSS 120B</h3>
                    <p>AI code analysis and feedback engine</p>
                  </div>

                  <span className="ai-status">
                    ● Configured
                  </span>
                </div>

                <div className="settings-divider"></div>

                <div className="languages-heading">
                  <h3>Supported Programming Languages</h3>
                  <span>5 Languages</span>
                </div>

                <div className="language-tags">
                  {languages.map((language) => (
                    <span className="language-tag" key={language}>
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Privacy Section */}
            <section className="settings-section">
              <div className="settings-section-heading">
                <span className="settings-icon">🔒</span>
                <div>
                  <h2>Privacy & Data</h2>
                  <p>Manage your code review history</p>
                </div>
              </div>

              <div className="setting-card danger-card">
                <div className="setting-info">
                  <h3>Delete All Review History</h3>
                  <p>
                    Permanently delete all your saved code reviews.
                    This action cannot be undone.
                  </p>
                </div>

                <button
                  className="danger-btn"
                  onClick={clearHistory}
                >
                  🗑 Delete All Reviews
                </button>
              </div>
            </section>

            {/* Account Actions */}
            <section className="settings-section">
              <div className="settings-section-heading">
                <span className="settings-icon">🚪</span>
                <div>
                  <h2>Account Actions</h2>
                  <p>Manage your current session</p>
                </div>
              </div>

              <div className="setting-card logout-card">
                <div className="setting-info">
                  <h3>Sign Out</h3>
                  <p>
                    Log out of your ReviewAI account on this device.
                  </p>
                </div>

                <button
                  className="logout-setting-btn"
                  onClick={logout}
                >
                  Logout →
                </button>
              </div>
            </section>

            <div className="settings-footer">
              <span>ReviewAI</span>
              <p>AI-powered code reviews. Built for developers.</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
