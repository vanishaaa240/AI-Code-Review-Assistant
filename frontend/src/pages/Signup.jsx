
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/authService";
import "./Login.css";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      const response = await signupUser({
        name,
        email,
        password,
      });

      alert(response.message || "Account created successfully!");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background-glow"></div>

      <div className="login-card">
        <div className="login-brand">
          <div className="login-brand-icon">{"</>"}</div>
          <span>ReviewAI</span>
        </div>

        <div className="login-heading">
          <span className="login-eyebrow">GET STARTED</span>
          <h1>Create your account</h1>
          <p>
            Join ReviewAI and make your code better with AI-powered reviews.
          </p>
        </div>

        <form onSubmit={handleSignup} className="login-form">
          <div className="login-input-group">
            <label htmlFor="signup-name">Full Name</label>
            <input
              id="signup-name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
          </div>

          <div className="login-input-group">
            <label htmlFor="signup-email">Email Address</label>
            <input
              id="signup-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="login-input-group">
            <label htmlFor="signup-password">Password</label>

            <div className="login-password-wrapper">
              <input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="login-submit-btn"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
            {!loading && <span>→</span>}
          </button>
        </form>

        <div className="login-divider">
          <span>ALREADY A MEMBER?</span>
        </div>

        <p className="signup-text">
          Already have an account?
          <button type="button" onClick={() => navigate("/")}>
            Sign In
          </button>
        </p>

        <div className="login-footer">
          <span className="login-footer-dot"></span>
          Start your smarter coding journey.
        </div>
      </div>
    </div>
  );
}

export default Signup;
