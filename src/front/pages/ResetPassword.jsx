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
<<<<<<< HEAD
    if (password !== confirm) return setMsg("The passowrds do not match");

    const res = await fetch("https://opulent-capybara-q7pw5qxjgw4v29rww-3001.app.github.dev/api/reset-password", {  // POST al backend sin token en URL
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }), // mandamos token + contraseña en body
    });
=======
    if (password !== confirm) {
      setMsg("Las contraseñas no coinciden");
      return;
    }
>>>>>>> 02f52be7073774c635adce29d6cbbff230987c4f

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
<<<<<<< HEAD
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Reset</button>
      <p>{msg}</p>
    </form>
=======
    <div className="resetMain">
      <AnimatedBackground />
      <form onSubmit={handleSubmit} className="resetForm">
        <h2>Establece una nueva contraseña</h2>

        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        <div className="contBtn">
          <button type="submit" className="btnSign">
            Restablecer
          </button>
        </div>

        {msg && (
          <p className={msg.includes("no coinciden") ? "error" : ""}>{msg}</p>
        )}

        <div className="secondary-link">
          <Link to="/login">Volver al login</Link>
        </div>
      </form>
    </div>
>>>>>>> 02f52be7073774c635adce29d6cbbff230987c4f
  );
}

export default ResetPassword;
