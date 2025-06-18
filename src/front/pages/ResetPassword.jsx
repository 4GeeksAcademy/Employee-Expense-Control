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
    if (password !== confirm) {
      setMsg("Las contraseñas no coinciden");
      return;
    }

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
  );
}

export default ResetPassword;
