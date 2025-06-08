import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom"; 
import "../DesignComponents/Home/home.css";




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
          src={rigoImageUrl}
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

      {/* Sección de características (cards) */}
      <section className="home-features">
        <article className="feature-card">
          <div className="feature-icon">🧾</div>
          <h3 className="feature-title">Sube tus facturas</h3>
          <p className="feature-desc">
            Centraliza todas tus facturas en un solo lugar con un sólo click.
          </p>
        </article>
        <article className="feature-card">
          <div className="feature-icon">📊</div>
          <h3 className="feature-title">Presupuestos flexibles</h3>
          <p className="feature-desc">
            Crea y aprueba presupuestos en tiempo real, sin hojas de cálculo.
          </p>
        </article>
        <article className="feature-card">
          <div className="feature-icon">📈</div>
          <h3 className="feature-title">Reportes detallados</h3>
          <p className="feature-desc">
            Genera gráficos y exporta informes al instante para tus stakeholders.
          </p>
        </article>
      </section>
    </main>
  );
};
