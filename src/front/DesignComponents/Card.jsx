import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CardOption = ({ title, to, buttonText, icon }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{
                backgroundColor: "#f9fafb",
                borderRadius: "16px",
                padding: "1.8rem",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.08)",
                width: "100%",
                maxWidth: "280px",
                textAlign: "center",
                border: "1px solid #e5e7eb"
            }}
        >
            <div style={{ fontSize: "2rem", marginBottom: "1rem", color: "#10b981" }}>
                {icon}
            </div>
            <h2 style={{
                fontSize: "1.2rem",
                fontWeight: "600",
                marginBottom: "0.75rem",
                color: "#111827"
            }}>
                {title}
            </h2>
            <Link
                to={to}
                style={{
                    display: "inline-block",
                    padding: "0.5rem 1.25rem",
                    backgroundColor: "#10b981",
                    color: "white",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontWeight: "500",
                    transition: "background-color 0.3s ease"
                }}
            >
                {buttonText}
            </Link>
        </motion.div>
    );
};

export default CardOption;