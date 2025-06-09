import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link} from "react-router-dom";
import LoginButton from "./LoginButton";
import { useAuth } from "../hooks/AuthContext";
import ghostLogo from "../assets/img/ghost.png";
import "../DesignComponents/Navbar/navbar.css";
//import { Companiesprofile } from "./pages/Companiesprofile";
//import { BrowserRouter, Routes, Route } from "react-router-dom";

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
 <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
  <div className="container-fluid">

    {/* 👈 Logo on the left */}
    <div className="navbar-brand d-flex align-items-center">
      <Link to="/" className="d-flex align-items-center">
        <img src={ghostLogo} alt="Ghost Bill" className="navbar-logo" />
      </Link>
      <span className="brand-text ms-2">Ghost Bill</span>
    </div>

    {/* 👉 Auth buttons on the right BEFORE the toggler */}
    <div className="d-flex align-items-center order-sm-last ms-auto">
      <div className="navbar-actions d-flex align-items-center me-2">
        {isAuthenticated ? (
          <>
            <button onClick={() => navigate("/")} className="buttonNav me-2">Home</button>
            <button onClick={handleLogout} className="buttonNav logout" disabled={Loading}>Logout</button>
          </>
        ) : (
          <LoginButton />
        )}
      </div>

      {/* Toggler icon at the far right */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavbar"
        aria-controls="collapsibleNavbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
    </div>

    {/* Collapsible nav links */}
    <div className="collapse navbar-collapse" id="collapsibleNavbar">
      <ul className="navbar-nav mainLinks">
        <li>
          <Link to="/companiesprofile" className="nav-link">Companies</Link>
        </li>
        <li>
          <Link to="/about-us" className="nav-link">Pricing</Link>
        </li>
        <li className="nav-item dropdown">
          <Link to="#" className="nav-link d-flex align-items-center" role="button">
            About us
            <span className="bi bi-caret-down-fill caret-arrow ms-2">&#9650;</span>
          </Link>
          <ul className="dropdown-menu aboutMain">
            <li><Link to="/our-team" className="dropdown-item aboutLinks linkColor">Our Team</Link></li>
            <li><Link to="/our-story" className="dropdown-item aboutLinks linkColor">Our Story</Link></li>
            <li><Link to="/contact" className="dropdown-item aboutLinks linkColor">Contact</Link></li>
          </ul>
        </li>
      </ul>
    </div>

  </div>
</nav>


  );
};




// position-absolute top-100 start-0 w-100 bg-dark