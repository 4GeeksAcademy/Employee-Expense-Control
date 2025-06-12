import React from 'react';
import { motion } from "framer-motion";

const BudgetCardGrid = ({ children }) => {
    return (
        <motion.div
            layout // Permite animaciones de layout si el grid cambia de tamaño o contenido
            initial={{ opacity: 0 }} // Animación de entrada para el grid
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", // Columnas responsivas
                gap: "1.5rem", // Espacio entre tarjetas
                padding: "0.5rem" // Un poco de padding alrededor del grid
            }}
        >
            {children}
        </motion.div>
    );
};

export default BudgetCardGrid;