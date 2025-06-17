import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import AnimatedBackground from "../DesignComponents/GlobalComponents/AnimatedBackground";
import "../DesignComponents/ResetPassword/resetPassword.css";

function ResetPassword() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) return setMsg("The passowrds do not match");

    const res = await fetch("https://opulent-capybara-q7pw5qxjgw4v29rww-3001.app.github.dev/api/reset-password", {  // POST al backend sin token en URL
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }), // mandamos token + contraseña en body
    });

    const res = await fetch(
      "https://laughing-sniffle-56x47xpqvr62q7q-3000.app.github.dev/api/reset-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      }
    );
    const data = await res.json();
    setMsg(data.msg);
  };

  return (
    <div className="resetMain">
      <AnimatedBackground />
      <form onSubmit={handleSubmit} className="resetForm">
        <h2>Create a new password</h2>

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        <div className="contBtn">
          <button type="submit" className="btnSign">
            Reset
          </button>
        </div>

        {msg && (
          <p className={msg.includes("Passwords do not match") ? "error" : ""}>{msg}</p>
        )}

        <div className="secondary-link">
          <Link to="/login">Go back to login</Link>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
