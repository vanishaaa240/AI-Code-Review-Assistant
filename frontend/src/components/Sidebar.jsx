import "./Sidebar.css";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();
  const location = useLocation();

  return (

    <div className="sidebar">

      <h2>Dashboard</h2>

      <ul>

        <li
          className={location.pathname === "/home" ? "active" : ""}
          onClick={() => navigate("/home")}
        >
          🏠 Home
        </li>

        <li
          className={location.pathname === "/history" ? "active" : ""}
          onClick={() => navigate("/history")}
        >
          📜 History
        </li>

        <li
          className={location.pathname === "/profile" ? "active" : ""}
          onClick={() => navigate("/profile")}
        >
          👤 Profile
        </li>

        <li
          className={location.pathname === "/settings" ? "active" : ""}
          onClick={() => navigate("/settings")}
        >
          ⚙️ Settings
        </li>

        <li
          className={location.pathname === "/help" ? "active" : ""}
          onClick={() => navigate("/help")}
        >
          ❓ Help
        </li>

      </ul>

    </div>

  );

}

export default Sidebar;