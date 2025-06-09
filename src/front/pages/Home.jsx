import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom"; 
import "../DesignComponents/Home/home.css";
import "../DesignComponents/GlobalComponents/GlobalButton.css"
import { CardsFeatures } from "../DesignComponents/GlobalComponents/CardFeatures/CardsFeatures.jsx";




export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}

	useEffect(() => {
		loadMessage()
	}, [])

	 return (
    <main className="home">
      {/* Hero principal */}
      <section className="home-hero">
        <h1 className="hero-title">Hello Rigoberto!!</h1>
        <p className="hero-subtitle">
          Bienvenido a Ghost Bill, tu aliado para gestionar facturas y presupuestos.
        </p>
        <img
          src=""
          className="hero-image"
          alt="Ghost Bill Illustration"
        />

        {/* CTA */}
        <Link to="/signup" className="hero-cta">
          Sign up
        </Link>

        {/* Mensaje de prueba del backend */}
        <div className="alert alert-info hero-alert">
          {store.message ? (
            <span>{store.message}</span>
          ) : (
            <span className="text-danger">
              Cargando mensaje desde el backend...
            </span>
          )}
        </div>
      </section>

     <CardsFeatures/>
    </main>
  );
};
