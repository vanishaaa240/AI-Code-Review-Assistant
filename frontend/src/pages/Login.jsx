import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { loginUser } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await loginUser({
        email,
        password,
      });

      alert(response.message);

      localStorage.setItem("token", response.token);

      navigate("/home");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🤖 AI Code Review</h1>

        <p className="welcome">Welcome Back 👋</p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <p className="signup-text">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;