import { motion } from "framer-motion";

const WelcomePanel = () => {
    return (
        <motion.div
            layout
            whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            style={{
                background: "linear-gradient(135deg, #10b981, #059669)",
                padding: "1.5rem",
                borderRadius: "16px",
                color: "white",
                marginBottom: "2rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
            }}
        >
            <div style={{ position: "relative", zIndex: 1 }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "600" }}>
                    You're doing great!
                </h2>
                <p style={{ marginTop: "0.5rem", fontSize: "1rem" }}>
                    Check budgets and assignments below, and keep your department organized.
                </p>
            </div>
        </motion.div>
    );
};

export default WelcomePanel;