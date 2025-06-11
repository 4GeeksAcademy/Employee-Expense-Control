import { motion } from "framer-motion";

const DashboardHeader = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: "2rem" }}
        >
            <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#1f2937" }}>
                Welcome Supervisor 👋
            </h1>
            <p style={{ fontSize: "1.1rem", color: "#4b5563" }}>
                Use the panel to manage budgets, assignments and insights.
            </p>
        </motion.div>
    );
};

export default DashboardHeader;