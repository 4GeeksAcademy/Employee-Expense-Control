import { motion } from "framer-motion";

const EmpWelcomePanel = () => {
    return (
        <motion.div
            layout
            whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            style={{
                background: "linear-gradient(180deg, #9E7515)",
                padding: "1.5rem",
                borderRadius: "16px",
                color: "white",
                marginBottom: "2rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                marginTop: "15px"
            }}
        >
            <div style={{ position: "relative", zIndex: 1 }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "600" }}>
                    Everything you need is here!
                </h2>
                <p style={{ marginTop: "0.5rem", fontSize: "1rem" }}>
                    Check budgets, invoices and assignments below, and keep your expenses organized.
                </p>
            </div>
        </motion.div>
    );
};

export default EmpWelcomePanel;