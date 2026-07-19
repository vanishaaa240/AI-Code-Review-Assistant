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
        "http://localhost:5000/api/auth/profile",
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

      console.log(error);

    }

  };

  // Delete All Reviews
  const clearHistory = async () => {

    const confirmDelete = window.confirm(
      "⚠️ Are you sure you want to delete ALL review history?\n\nThis action cannot be undone."
    );

    if (!confirmDelete) return;

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        "http://localhost:5000/api/code-review/delete-all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("All Reviews Deleted Successfully");

    } catch (error) {

      console.log(error);

      toast.error("Failed to delete reviews");

    }

  };

  // Logout
  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  return (

    <div className="home">

      <Navbar />

      <div className="main-layout">

        <Sidebar />

        <div className="content">

          <div className="settings-container">

            <h1>⚙️ Settings</h1>

            {/* Account */}

            <div className="setting-card">

              <h3>👤 Account</h3>

              <p>
                <b>Name :</b> {user.name}
              </p>

              <p>
                <b>Email :</b> {user.email}
              </p>

            </div>

            {/* Appearance */}

            <div className="setting-card">

              <h3>🎨 Appearance</h3>

              <p>
                Current Theme :
                <strong> {theme.toUpperCase()}</strong>
              </p>

              <button
                className="theme-setting-btn"
                onClick={toggleTheme}
              >

                {theme === "dark"
                  ? "☀ Switch to Light"
                  : "🌙 Switch to Dark"}

              </button>

            </div>

            {/* AI */}

            <div className="setting-card">

              <h3>🤖 AI Settings</h3>

              <p>
                <strong>Model :</strong> Groq Llama 3.3
              </p>

              <p>
                <strong>Supported Languages</strong>
              </p>

              <ul>

                <li>C</li>
                <li>C++</li>
                <li>Java</li>
                <li>Python</li>
                <li>JavaScript</li>

              </ul>

            </div>

            {/* Privacy */}

            <div className="setting-card">

              <h3>🔒 Privacy</h3>

              <button
                className="danger-btn"
                onClick={clearHistory}
              >
                🗑 Delete All Reviews
              </button>

            </div>

            {/* Logout */}

            <div className="setting-card">

              <h3>🚪 Account Actions</h3>

              <button
                className="logout-setting-btn"
                onClick={logout}
              >
                Logout
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Settings;