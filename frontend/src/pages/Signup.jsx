import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/authService";
import "./Login.css";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await signupUser({
        name,
        email,
        password,
      });

      alert(response.message);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h1>🤖 AI Code Review</h1>

        <p className="welcome">Create Your Account 🚀</p>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button onClick={handleSignup}>
          Sign Up
        </button>

        <p className="signup-text">
          Already have an account? <span onClick={() => navigate("/")}>Login</span>
        </p>

      </div>
    </div>
  );
}

export default Signup;