import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendResetEmail } from "../services/apiServicesFetch";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("https://bug-free-tribble-x5p5q5jpjwxgc9x6r-3001.app.github.dev/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setMsg(data.msg);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Recuperar contraseña</h2>
      <input
        type="email"
        placeholder="Tu correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Enviar</button>
      <p>{msg}</p>
    </form>
  );
}

export default ForgotPassword