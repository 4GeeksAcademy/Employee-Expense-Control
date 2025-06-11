import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CardOption = ({ title, to, buttonText }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
                width: "100%",
                maxWidth: "300px",
                backgroundColor: "#fff",
                padding: "1.5rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "0.5rem"
            }}
        >
            <h2
                style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    marginBottom: "1rem",
                    textAlign: "center"
                }}
            >
                {title}
            </h2>
            <Link to={to}>
                <button
                    style={{
                        width: "100%",
                        padding: "0.75rem",
                        backgroundColor: "#3b82f6",
                        color: "#fff",
                        border: "none",
                        borderRadius: "0.375rem"
                    }}
                >
                    {buttonText}
                </button>
            </Link>
        </motion.div>
    );
};

export default CardOption;