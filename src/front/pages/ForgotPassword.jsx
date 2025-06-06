import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendResetEmail } from "../services/apiServicesFetch";
import { Link } from "react-router-dom"
import "../DesignComponents/SignUp/signup.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");            // esto guarda el email que el usuario escribe
  const [message, setMessage] = useState("");        // aqui se guardaw el mensaje de éxito o error
  const navigate = useNavigate();                    // Permite redirigir a otra vista (por ejemplo: al login)

  const handleSubmit = async (e) => {
    e.preventDefault();                              // Evita que el formulario recargue la página
    try {
      await sendResetEmail(email);                   // Llama a la función del servicio que envía el correo electronicoe
      setMessage("Correo enviado. Revisa tu bandeja de entrada.");  // Muestra mensaje de éxito
      setTimeout(() => navigate("/login"), 3000);    // Espera 3 segundos y redirige al login
    } catch (error) {
      setMessage(error.message);                     // Muestra error si el backend responde con erorres
    }
  };

  return (
    <div className="signMain">
      <form onSubmit={handleSubmit} className="signForm">
        <div className="signHeading">
          <h2> Forgot your password?</h2>
        </div>
        <div className="container">
          <div className="mb-3">
            <label htmlFor="email" className="Signform-label required-label">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              className="form-control custom-placeholder"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {message && (
            <div
              className={`alert ${
                message.toLowerCase().includes("error") ? "alert-danger" : "alert-success"
              } errorAlert`}
            >
              {message}
            </div>
          )}

          <div className="mb-3 d-grid gap-2 contBtn">
            <button type="submit" className="btnSign btn">
              Send reset link
            </button>
          </div>
          <div className="form-text emailHelp">
                Remember your password? <Link className="linkColor" to="/login">Back to login</Link>
               </div>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
