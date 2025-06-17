import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ResetPassword() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token"); // aquí extraemos el token del query string
  
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

    const data = await res.json();
    setMsg(data.msg);
  };
  
  return (
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
  );
}

export default ResetPassword;
