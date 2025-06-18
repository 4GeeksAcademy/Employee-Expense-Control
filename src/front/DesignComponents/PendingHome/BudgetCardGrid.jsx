import React from 'react';
import { motion } from "framer-motion";

const BudgetCardGrid = ({ children }) => {
    return (
        <motion.div
            layout 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
                gap: "1.5rem", 
                padding: "0.5rem" 
            }}
        >
            {children}
        </motion.div>
    );
};

export default BudgetCardGrid;