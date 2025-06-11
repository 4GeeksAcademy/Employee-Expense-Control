import React from 'react'; // Es buena práctica importar React
import { FaUserShield, FaChartPie, FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const Sidebar = () => {

    // 1. Variantes para el contenedor principal del sidebar (animación de entrada escalonada)
    const sidebarVariants = {
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                when: "beforeChildren", // Inicia la animación de los hijos después que el padre
                staggerChildren: 0.1, // Retraso de 0.1s entre cada elemento hijo
            },
        },
        hidden: {
            opacity: 0,
            x: -50,
        },
    };

    // 2. Variantes para los elementos individuales del menú
    const itemVariants = {
        // Estado de cada item cuando el padre está en 'visible'
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring", // Animación de resorte para los ítems
                stiffness: 100,
                damping: 10,
            },
        },
        // Estado de cada item cuando el padre está en 'hidden'
        hidden: {
            opacity: 0,
            x: -20, // Se mueve ligeramente a la izquierda
        },
        // Efecto al pasar el ratón (hover)
        hover: {
            scale: 1.05,
            x: 10,
            color: "#93c5fd",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)", // Sombra más pronunciada
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 10,
            },
        },
        // Efecto al hacer clic (tap)
        tap: {
            scale: 0.95,
            backgroundColor: "#3b82f6", // Un azul más brillante al tocar
            color: "white", // Asegura que el texto siga siendo blanco
            transition: {
                duration: 0.1,
                ease: "easeOut",
            },
        },
    };

    // Variantes para los iconos dentro de cada elemento del menú (opcional)
    const iconVariants = {
        hover: {
            rotate: 10, // Rota ligeramente el icono
            scale: 1.1, // Agranda un poco el icono
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 10
            }
        },
        tap: {
            scale: 0.9
        }
    };

    const menuItems = [
        { icon: <FaUserShield />, text: "Profile" },
        { icon: <FaChartPie />, text: "Overview" },
        { icon: <FaSignOutAlt />, text: "Logout" },
    ];

    return (
        <motion.div
            style={{
                width: "250px",
                backgroundColor: "#1f2937",
                color: "white",
                display: "flex",
                flexDirection: "column",
                padding: "1.5rem",
                boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
                borderRadius: "0.75rem",
            }}
            variants={sidebarVariants}
            initial="hidden" // El sidebar comienza oculto
            animate="visible" // Y se anima a visible al cargar la página
        >
            <h2
                style={{
                    fontSize: "1.5rem",
                    marginBottom: "2rem",
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#93c5fd",
                }}
            >
                Supervisor Panel
            </h2>
            <nav
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                {menuItems.map((item, index) => (
                    <motion.span
                        key={index}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            padding: "0.75rem 1rem",
                            borderRadius: "0.5rem",
                            cursor: "pointer",
                            transition: "background-color 0.2s ease-in-out", // Transición suave para el fondo
                        }}
                        variants={itemVariants}
                        whileHover="hover"
                        whileTap="tap"
                    // `animate="visible"` e `initial="hidden"` no son necesarios aquí
                    // porque `staggerChildren` del padre ya controla su animación.
                    >
                        {/* Envuelve el ícono en un motion.span para animarlo individualmente */}
                        <motion.span
                            variants={iconVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            {item.icon}
                        </motion.span>
                        {item.text}
                    </motion.span>
                ))}
            </nav>
        </motion.div>
    );
};

export default Sidebar;