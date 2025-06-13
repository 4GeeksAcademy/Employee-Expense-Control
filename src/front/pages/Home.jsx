import React, { useEffect } from "react";
//import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import "../DesignComponents/Home/home.css";
import ImageCarousel from "../DesignComponents/Home/ImageCarousel";
import "../DesignComponents/GlobalComponents/GlobalButton.css"
import { CardsFeatures } from "../DesignComponents/GlobalComponents/CardFeatures/CardsFeatures.jsx";
import { KnowTeam } from "../DesignComponents/Home/KnowTeam.jsx";
import { ClientCarousel } from "../DesignComponents/Home/ClientCarousel.jsx";
import CapitalBox from "../DesignComponents/Home/CapitalBox.jsx";





export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  const loadMessage = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file");

      const response = await fetch(backendUrl + "/hello");
      const data = await response.json();
      if (response.ok) dispatch({ type: "set_hello", payload: data.message });
      return data;
    } catch (error) {
      if (error.message) throw new Error(
        `Could not fetch the message from the backend.
         Please check if the backend is running and the backend port is public.`
      );
    }
  };

  useEffect(() => {
    loadMessage();
  }, []);

  // AQUI LAS SLIDES
  const slides = [
    {
      src: "/src/front/assets/img/1.jpg",
      alt: "Slide 1",
      interval: 6000,
      caption: {
        title: "Smart Budgeting",
        text: "Create, approve, and monitor budgets in real time—no spreadsheets, just simplicity.",
      },
    },
    {
      src: "/src/front/assets/img/2.jpg",
      alt: "Slide 2",
      interval: 5000,
      caption: {
        title: "Effortless Invoice Tracking",
        text: "Stay on top of employee expenses with centralized, automated invoice management.",
      },
    },
    {
      src: "/src/front/assets/img/3.jpg",
      alt: "Slide 3",
      interval: 7000,
      caption: {
        title: "Your Finance Hub",
        text: "Unify expense reports, budgets, and invoices in one intuitive platform with Ghost Bill.",
      },
    },
  ];

  return (
    <main className="">
      {/* Hero principal */}
      {/* <img
             src={rigoImageUrl}
             className="hero-image"
             alt="Ghost Bill Illustration"
           /> */}
      <section className="home-hero">
        {/* <h1 className="hero-title">Hello Rigoberto!!</h1> */}
        <div className="hero-carousel-wrapper">
          <p className="hero-subtitle home">
            Welcome to Ghost Bill — your trusted partner for managing invoices and budgets.
          </p>


          {/* <img
          src=""
          className="hero-image"
          alt=""
        /> */}


          {/* CTA */}
          <Link to="/signup" className="hero-cta home">
            Sign up
          </Link>

          {/* Carrusel Bootstrap */}
          {/* ─────────────────────────────────────────────────────────────── */}
          <div className="mt-4">
            <ImageCarousel images={slides} />
          </div>
        </div>
        {/* ─────────────────────────────────────────────────────────────── */}

        {/* Mensaje de prueba del backend */}
        {/* <div className="alert alert-info hero-alert">
          {store.message ? (
            <span>{store.message}</span>
          ) : (
            <span className="text-danger">
              Cargando mensaje desde el backend...
            </span>
          )}
        </div> */}
      </section>

      <CapitalBox />
      <CardsFeatures />
      <KnowTeam />
      <ClientCarousel />
    </main>
  );
};
