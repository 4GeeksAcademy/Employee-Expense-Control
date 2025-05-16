import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginButton from "./LoginButton";
import { useAuth } from "../hooks/AuthContext";

const backendUrl = import.meta.env.VITE_BACKEND_URL;


export const Navbar = () => {

	const{isAuthenticated, logout}= useAuth();
	const[Loading,setLoading]= useState(false)
	const navigate=useNavigate();
	
	const handleLogout = async ()=> {
		setLoading(true)
		try {
			await logout();
			navigate("/login");
			}
			catch(error){
			console.error("error when closing session:",error)
		} finally {
			setLoading(false);
		}

	};



	return (
		  <nav className="navbar">
      <div className="navbar-brand">Spending Control</div>
      <div className="navbar-actions">
        {isAuthenticated ? (
          <>
		    <button onClick={() => navigate("/")} className="button">
              Área Prueba
            </button>
            <button
              onClick={handleLogout}
              className="button logout"
              disabled={Loading}
            >
              <i className="fas fa-door-open" style={{ marginRight: "8px" }}></i>
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