import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, NavLink, Link} from "react-router-dom";
import LoginButton from "./LoginButton";
import { useAuth } from "../hooks/AuthContext";

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
 <nav className="navbar navbar-expand-sm bg-dark navbar-dark sticky-top">
  <div className="container-fluid">

    <div className="navbar-brand d-flex align-items-center">
      <Link to="/" className="d-flex align-items-center">
        <img src="https://res.cloudinary.com/dzcl2whin/image/upload/v1750099848/ghost_g2nv7j.png" alt="Ghost Bill" className="navbar-logo" />
      </Link>
      <span className="brand-text ms-2">Ghost Bill</span>
    </div>

    <div className="d-flex align-items-center order-sm-last ms-auto">
      <div className="navbar-actions d-flex align-items-center me-2">
        {isAuthenticated ? (
          <>
            <button onClick={() => navigate("/")} className="me-2 nav-button login navLoginbtn">Home</button>
            <button onClick={handleLogout} className="logout nav-button login navLoginbtn" disabled={Loading}>Logout</button>
          </>
        ) : (
          <LoginButton />
        )}
      </div>

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

    <div className="collapse navbar-collapse" id="collapsibleNavbar">
      <ul className="navbar-nav mainLinks">
        <li>
          <NavLink to="/companiesprofile" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Companies</NavLink>
        </li>
        <li>
          <NavLink to="/pricingpage" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Pricing</NavLink>
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
