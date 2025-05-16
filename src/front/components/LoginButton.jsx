import { useState } from "react";
import { useNavigate } from "react-router-dom";



const LoginButton = ()=> {
    const navigate = useNavigate()
    
    const handleLoginClick = ()=> {
        navigate("/login")
    };
    return (
       <button
      onClick={handleLoginClick}
      className="nav-button login"
    >
      Iniciar Sesión
    </button>
    )

}

export default LoginButton;