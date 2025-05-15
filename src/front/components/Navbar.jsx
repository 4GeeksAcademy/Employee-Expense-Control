import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoginButton from "./LoginButton";

const backendUrl = import.meta.env.VITE_BACKEND_URL;



export const Navbar = () => {

	const[isAuthenticated,setAuthenticated]=useState(false)
	const[Loading,setLoading]= useState(false)
	const navigate=useNavigate()

	useEffect(()=> {
		const token = localStorage.getItem('jwt_token')
		setAuthenticated(!!token);
	}, [])

	// const handleLogin= async ()=> {
	// 	setLoading(true);
	// 	try {
	// 		const resp = await fetch(`${backendUrl}/login`,{
	// 			method: 'POST'
	// 		});
	// 		if (!resp.ok) throw new error ('Error obtaining token');

	// 		const data = await resp.json();
	// 		localStorage.setItem('jwt_token', data.access_token);
	// 		setAuthenticated(true);
	// 		navigate('')
	// 	}catch (error){
	// 		console.error('error:',error)
	// 		alert('login error')
	// 	} finally {
	// 		setLoading(false)
	// 	}
	// };

	const handleLogout = async ()=> {
		setLoading(true)
		const token = localStorage.getItem('jwt_token');
		if (!token) return 
		try {
			await fetch(`${backendUrl}/logout`,{
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});
		} catch (error){
			console.error("error when closing session:",error)
		} finally {
			localStorage.removeItem('jwt_token');
			setAuthenticated(false);
			setLoading(false);
			navigate('/login');
		}

	};



	return (
		  <nav className="navbar">
      <div className="navbar-brand">Mi Aplicación</div>
      <div className="navbar-actions">
        {isAuthenticated ? (
          <>
		    <button onClick={() => navigate("/demo")} className="button">
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
        //   <Link to="/login">
        //   <button
		//   	onClick={handleLogin}
        //     className="nav-button login"
        //     disabled={Loading}
        //   > 
        //     {Loading ? 'Cargando...' : 'Iniciar Sesión'}
        //   </button>
		//   </Link>
		<LoginButton />
        )}
      </div>
    </nav>
	);
};