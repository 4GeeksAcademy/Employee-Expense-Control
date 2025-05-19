import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendResetEmail } from "../services/apiServicesFetch";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");            // Guarda el email que el usuario escribe
  const [message, setMessage] = useState("");        // Guarda el mensaje de éxito o error
  const navigate = useNavigate();                    // Permite redirigir a otra vista (por ejemplo: al login)

  const handleSubmit = async (e) => {
    e.preventDefault();                              // Evita que el formulario recargue la página
    try {
      await sendResetEmail(email);                   // Llama a la función del servicio que envía el correo
      setMessage("Correo enviado. Revisa tu bandeja de entrada.");  // Muestra mensaje de éxito
      setTimeout(() => navigate("/login"), 3000);    // Espera 3 segundos y redirige al login
    } catch (error) {
      setMessage(error.message);                     // Muestra error si el backend responde con fallo
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">¿Olvidaste tu contraseña brother?</h2>
      <form onSubmit={handleSubmit} className="p-4 rounded-4 shadow-lg bg-white" style={{ maxWidth: '400px', margin: 'auto' }}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control rounded-pill"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="No te lies mi pana"
          />
        </div>
        <div className="d-grid mb-3">
          <button type="submit" className="btn btn-primary rounded-pill py-2">Enviar enlace</button>
        </div>
        {message && <p className="text-center">{message}</p>}   {/* Muestra el mensaje si existe */}
      </form>
    </div>
  );
};

export default ForgotPassword;
