import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../DesignComponents/Login/Loginbutton.css";



const LoginButton = ()=> {
    const navigate = useNavigate()
    
    const handleLoginClick = ()=> {
        navigate("/login")
    };
    return (
       <button
      onClick={handleLoginClick}
      className="nav-button login navLoginbtn"
    >
      LOG IN
    </button>
    )

}

export default LoginButton;