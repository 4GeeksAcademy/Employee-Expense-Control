import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CardOption = ({ title, to, buttonText }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                padding: "1.5rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                width: "100%",
                maxWidth: "300px",
                textAlign: "center"
            }}
        >
            <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}>
                {title}
            </h2>
            <Link
                to={to}
                style={{
                    display: "inline-block",
                    padding: "0.5rem 1rem",
                    backgroundColor: "#3b82f6",
                    color: "white",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontWeight: "500"
                }}
            >
                {buttonText}
            </Link>
        </motion.div>
    );
};

export default CardOption;