import React from 'react';
import { motion } from "framer-motion";

// Definimos nuestra paleta de colores (se repetirá en cada archivo,
// pero en un proyecto real la importarías desde un archivo de utilidades/tema)
const colors = {
    textDark: "#212121",
    inputBorder: "#CCCCCC",
    inputFocus: "#4CAF50",
};

const BudgetInfoDisplay = ({ budgetDescription, requestedAmount, editedAmount, onAmountChange, budgetId }) => {
    return (
        <>
            <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                style={{ marginBottom: "0.5rem", fontSize: "1rem", color: colors.textDark }}
            >
                <strong>Description:</strong> {budgetDescription}
            </motion.p>

            <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                style={{ marginBottom: "0.5rem", fontSize: "1rem", color: colors.textDark }}
            >
                <strong>Requested Amount:</strong>{" "}
                <motion.input
                    type="number"
                    value={editedAmount || requestedAmount}
                    onChange={(e) => onAmountChange(budgetId, parseFloat(e.target.value))}
                    whileFocus={{ scale: 1.02, borderColor: colors.inputFocus, boxShadow: `0 0 0 3px ${colors.inputFocus}40` }}
                    style={{
                        border: `1px solid ${colors.inputBorder}`,
                        padding: "0.4rem 0.75rem",
                        borderRadius: "8px",
                        width: "120px",
                        fontSize: "1rem",
                        color: colors.textDark,
                        outline: "none",
                        transition: "border-color 0.2s ease, box-shadow 0.2s ease"
                    }}
                />
            </motion.p>
        </>
    );
};

export default BudgetInfoDisplay;