import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { ThemeContext } from "../context/ThemeContext";

function Navbar() {
  const navigate = useNavigate();

  const { theme, toggleTheme } =
    useContext(ThemeContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">

      <div className="logo">
        ⚡ <span>ReviewAI</span>
      </div>

      <div className="nav-right">

        <button
          className="theme-btn"
          onClick={toggleTheme}
        >
          {theme === "dark"
            ? "☀️ Light"
            : "🌙 Dark"}
        </button>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;