import React from 'react';
import { motion } from "framer-motion";

const colors = {
    backgroundWhite: "#FFFFFF",
    primaryGreen: "#4CAF50",
    darkGreen: "#45A049",
    dangerRed: "#DC3545",
    darkDangerRed: "#C82333",
};

const BudgetActions = ({ budgetId, onAcceptClick, onRejectClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}
        >
            <motion.button
                onClick={() => onAcceptClick(budgetId)}
                whileHover={{ scale: 1.03, backgroundColor: colors.darkGreen }}
                whileTap={{ scale: 0.97 }}
                style={{
                    backgroundColor: colors.primaryGreen,
                    color: colors.backgroundWhite,
                    border: "none",
                    padding: "0.6rem 1.2rem",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "1.05rem",
                    flex: 1,
                    boxShadow: `0 4px 10px ${colors.primaryGreen}40`,
                    transition: "background-color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease"
                }}
            >
                Accept
            </motion.button>
            <motion.button
                onClick={() => onRejectClick(budgetId)}
                whileHover={{ scale: 1.03, backgroundColor: colors.darkDangerRed }}
                whileTap={{ scale: 0.97 }}
                style={{
                    backgroundColor: colors.dangerRed,
                    color: colors.backgroundWhite,
                    border: "none",
                    padding: "0.6rem 1.2rem",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "1.05rem",
                    flex: 1,
                    boxShadow: `0 4px 10px ${colors.dangerRed}40`,
                    transition: "background-color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease"
                }}
            >
                Reject
            </motion.button>
        </motion.div>
    );
};

export default BudgetActions;