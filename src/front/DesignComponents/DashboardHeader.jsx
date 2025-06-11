import React from "react";
import { motion } from "framer-motion";

const DashboardHeader = () => {
    return (
        <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
                fontSize: "2rem",
                fontWeight: "bold",
                marginBottom: "2rem",
                textAlign: "center",
                color: "#1f2937"
            }}
        >
            Hello Supervisor!
        </motion.h1>
    );
};

export default DashboardHeader;