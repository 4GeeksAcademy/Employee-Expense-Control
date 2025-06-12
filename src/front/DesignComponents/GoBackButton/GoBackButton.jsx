import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const GoBackButton = ({ to = "/supervisor", children = "Go Home" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }} // Animación para que aparezca desde arriba
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <Link
                to={to}
                style={{ textDecoration: 'none' }} // Elimina el subrayado del Link
            >
                <motion.button
                    type="button"
                    className="btn btn-lg" // 'btn' para el estilo base, 'btn-lg' para un tamaño grande
                    style={{
                        // Color verde personalizado usando la variable CSS
                        backgroundColor: 'var(--ghost-green)',
                        borderColor: 'var(--ghost-green)', // Asegura que el borde también sea verde
                        color: 'var(--ghost-white)', // Texto blanco, usando tu variable
                        fontWeight: 'semibold',
                        borderRadius: '0.5rem', // Para esquinas redondeadas (ajusta si Bootstrap tiene una clase específica que prefieras)
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        // Transiciones para hover/focus, si no las quieres manejar solo con Framer Motion
                        transition: 'background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease',
                    }}
                    whileHover={{ 
                        scale: 1.05,
                        backgroundColor: '#38735C', // Un tono un poco más oscuro de --ghost-green para el hover
                        borderColor: '#38735C',
                        boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)'
                    }} // Animación al pasar el ratón y cambio de color
                    whileTap={{ scale: 0.95 }}   // Animación al hacer clic
                >
                    {children}
                </motion.button>
            </Link>
        </motion.div>
    );
};

export default GoBackButton;