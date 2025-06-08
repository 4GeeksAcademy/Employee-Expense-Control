import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";      
import LoginButton from "./LoginButton";
import { useAuth } from "../hooks/AuthContext";
import ghostLogo from "../assets/img/ghost.png";           
import "../DesignComponents/Navbar/navbar.css";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("error when closing session:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="navbar">
      {/* Logo a la izquierda */}
      <div className="navbar-brand">
        <Link to="/">
          <img src={ghostLogo} alt="Ghost Bill" className="navbar-logo" />
        </Link>
        <span className="brand-text">Ghost Bill</span>
      </div>

      {/* Enlaces principales */}
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-link">Empresas</Link>
        </li>
        <li>
          <Link to="/about-us" className="nav-link">Pricing</Link>
        </li>
        <li>
          <Link to="/contact" className="nav-link">About us</Link>
        </li>
      </ul>

      {/* Acciones de autenticación */}
      <div className="navbar-actions">
        {isAuthenticated ? (
          <>
            <button onClick={() => navigate("/")} className="button">
              Home
            </button>
            <button
              onClick={handleLogout}
              className="button logout"
              disabled={Loading}
            >
              <i className="fas fa-door-open" style={{ marginRight: "8px" }} />
              Logout
            </button>
          </>
        ) : (
          <LoginButton />
        )}
      </div>
    </nav>
  );
};
