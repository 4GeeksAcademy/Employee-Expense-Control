import React from "react";
import ghostLogo from "../assets/img/ghost.png";
import "../DesignComponents/Footer/footer.css";

export function Footer() {
  return (
    <footer className="footer bg-dark">
      {/* Sección superior: logo + enlaces */}
      <div className="footer-top">
        <div className="footer-brand">
          <img src={ghostLogo} alt="Ghost Bill" className="footer-logo" />
          <span className="footer-title">Ghost Bill</span>
        </div>
        <div className="footer-links">
          <a href="/" className="footer-link">Home</a>
          <a href="/empresas" className="footer-link">Empresas</a>
          <a href="/pricing" className="footer-link">Pricing</a>
          <a href="/about-us" className="footer-link">About Us</a>
          <a href="/contact" className="footer-link">Contact</a>
        </div>
      </div>

      {/* Sección de redes sociales */}
      <div className="footer-contact">
        <span className="contact-label">Contact:</span>
        <a
          href="https://instagram.com/tuCuenta"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="https://twitter.com/tuCuenta"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X"
        >
          <i className="fab fa-x-twitter"></i>
        </a>
        <a
          href="https://linkedin.com/in/tuPerfil"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <i className="fab fa-linkedin"></i>
        </a>
        <a
          href="https://discord.gg/tuServidor"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Discord"
        >
          <i className="fab fa-discord"></i>
        </a>
        <a
          href="https://t.me/tuUsuario"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram"
        >
          <i className="fab fa-telegram"></i>
        </a>
      </div>

      {/* Dirección que redirige a Google Maps */}
      <address className="footer-address">
        <a
          href="https://maps.google.com/?q=123+Ghost+Street+Phantom+City+PC+00404"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          123 Ghost Street, Phantom City, PC 00404
        </a>
        <br />
        Email:{" "}
        <a href="mailto:contact@ghostbill.com" className="footer-link">
          contact@ghostbill.com
        </a>
        <br />
        Phone:{" "}
        <a href="tel:+1234567890" className="footer-link">
          +1 (234) 567-890
        </a>
      </address>

      {/* Pie de página */}
      <div className="footer-bottom">
        <p className="footer-copy">
          © {new Date().getFullYear()} Ghost Bill. All rights reserved.
        </p>
        <p className="footer-credit">
          Built with ❤️ by Ghost Bill
        </p>
      </div>
    </footer>
  );
}
