import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState(""); // changed from email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    try {
      await login(username, password); // send username instead of email
      const user = JSON.parse(localStorage.getItem("user"));
      if (user.role === "admin") navigate("/admin");
      else navigate("/student");
    } catch (err) {
      setError("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <div className="login-error">{error}</div>}
      <form onSubmit={handleSubmit}>


        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
