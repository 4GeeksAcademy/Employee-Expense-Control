import React from 'react';
import { motion } from "framer-motion";

// Definimos nuestra paleta de colores para mayor consistencia
const colors = {
    panelBackgroundGreen: "linear-gradient(135deg, #10b981, #059669)", 
    panelTextColor: "white",
    boxShadowLight: "rgba(0,0,0,0.1)",
};

const BudgetTitlePanel = ({ title, description }) => {
    return (
        <motion.div
            layout // Permite animaciones de layout si el panel se mueve o cambia de tamaño
            initial={{ opacity: 0, y: -20 }} // Viene desde arriba
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }} // Animación más lenta y suave
            style={{
                background: colors.panelBackgroundGreen,
                padding: "1.5rem",
                borderRadius: "16px",
                color: colors.panelTextColor,
                marginBottom: "2rem",
                boxShadow: `0 4px 12px ${colors.boxShadowLight}`,
                textAlign: "center" // Centramos el texto
            }}
        >
            <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{ fontSize: "1.8rem", fontWeight: "700", marginBottom: "0.5rem" }} // Más grande y en negrita
            >
                {title}
            </motion.h2>
            {description && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    style={{ fontSize: "1.1rem", opacity: 0.8 }} // Ligeramente transparente
                >
                    {description}
                </motion.p>
            )}
        </motion.div>
    );
};

export default BudgetTitlePanel;