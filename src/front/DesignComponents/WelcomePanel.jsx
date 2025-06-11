import { motion } from "framer-motion";

const WelcomePanel = () => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{
                background: "linear-gradient(135deg, #10b981, #059669)",
                padding: "1.5rem",
                borderRadius: "16px",
                color: "white",
                marginBottom: "2rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
        >
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600" }}>
                You're doing great!
            </h2>
            <p style={{ marginTop: "0.5rem", fontSize: "1rem" }}>
                Check budgets and assignments below, and keep your department organized.
            </p>
        </motion.div>
    );
};

export default WelcomePanel;