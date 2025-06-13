import React from 'react';
import { motion } from "framer-motion";

const colors = {
    textDark: "#212121",
    linkGreen: "#4CAF50",
    darkGreen: "#45A049",
};

const EmployeeLink = ({ employeeName, employeeId, onSelectEmployee }) => {
    return (
        <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            style={{ marginBottom: "1rem", fontSize: "1rem", color: colors.textDark }}
        >
            <strong>Employee:</strong>{" "}
            <motion.button
                onClick={() => onSelectEmployee(employeeId)}
                whileHover={{ scale: 1.05, color: colors.darkGreen }}
                whileTap={{ scale: 0.95 }}
                style={{
                    color: colors.linkGreen,
                    textDecoration: "underline",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    fontSize: "1rem",
                    fontWeight: "500"
                }}
            >
                {employeeName}
            </motion.button>
        </motion.p>
    );
};

export default EmployeeLink;