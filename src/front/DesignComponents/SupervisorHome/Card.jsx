import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CardOption = ({ title, to, buttonText, icon }) => {
    // Colores principales de tu gradiente
    const greenStart = "#10b981"; // El verde más claro del gradiente
    const greenEnd = "#059669";   // El verde más oscuro del gradiente

    // Un verde intermedio o el color principal para iconos y sombras cuando no es un gradiente
    const mainGreen = "#059669"; // Usamos el verde más oscuro del gradiente como el principal

    return (
        <motion.div
            // Animaciones de la tarjeta al pasar el ratón y al hacer clic
            whileHover={{
                scale: 1.05,
                y: -10, // Un ligero desplazamiento hacia arriba
                // Sombra con el color verde principal, ligeramente más visible
                boxShadow: `0 12px 25px ${mainGreen}33`, // Opacidad del 20%
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }} // Ajustes para una animación más suave
            layout // Permite animaciones de layout cuando se añade o quita del DOM
            style={{
                backgroundColor: "#ffffff", // Fondo blanco
                borderRadius: "20px", // Bordes más redondeados
                padding: "2rem", // Más padding para un look espacioso
                boxShadow: "0 6px 15px rgba(0,0,0,0.05)", // Sombra inicial suave, gris/negro
                width: "100%",
                maxWidth: "300px", // Ancho máximo
                textAlign: "center",
                border: "1px solid #e0e0e0", // Borde gris muy sutil
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <div style={{
                fontSize: "2.5rem", // Icono un poco más grande
                marginBottom: "1rem",
                color: mainGreen, // Verde principal para el icono
                transition: "color 0.3s ease-in-out",
            }}>
                {icon}
            </div>
            <h2 style={{
                fontSize: "1.35rem", // Título ligeramente más grande
                fontWeight: "700", // Más negrita
                color: "#333333", // Gris oscuro para el texto
                marginBottom: "1rem",
            }}>
                {title}
            </h2>
            <motion.div
                // Contenedor para el botón para aplicar animaciones
                whileHover={{
                    scale: 1.05, // Escala un poco el botón al pasar el ratón
                    // Sombra del botón con el color verde principal
                    boxShadow: `0 4px 10px ${mainGreen}4D`, // Opacidad del 30%
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
                <Link
                    to={to}
                    style={{
                        display: "inline-block",
                        padding: "0.75rem 1.75rem", // Más padding para un botón más grande
                        background: `linear-gradient(135deg, ${greenStart}, ${greenEnd})`, // Fondo de botón con gradiente
                        color: "white", // Texto blanco para el botón
                        borderRadius: "10px", // Bordes más redondeados para el botón
                        fontWeight: "600",
                        textDecoration: "none",
                        transition: "background 0.3s ease-in-out, box-shadow 0.3s ease-in-out", // Transiciones suaves
                        boxShadow: `0 2px 5px ${mainGreen}20`, // Sombra inicial para el botón (verde sutil)
                    }}
                >
                    {buttonText}
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default CardOption;