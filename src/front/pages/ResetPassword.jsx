import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) return setMsg("Las contraseñas no coinciden");

    const res = await fetch(`https://bug-free-tribble-x5p5q5jpjwxgc9x6r-3001.app.github.dev/api/reset-password/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();
    setMsg(data.msg);
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Restablecer</button>
      <p>{msg}</p>
    </form>
  );
}

export default ResetPassword