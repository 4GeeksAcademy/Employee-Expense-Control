import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionLinkButton = motion(Link);

const GoBackButton = ({ to = "/supervisor", children = "⬅ Back to Dashboard" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "40px",
                marginBottom: "20px",
                width: "100%",
            }}
        >
            <MotionLinkButton
                to={to}
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "12px 24px",
                    background: "linear-gradient(to right, #10b981, #059669)",
                    color: "white",
                    fontWeight: "600",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    textDecoration: "none",
                    border: "none",
                    cursor: "pointer",
                }}
                whileHover={{
                    scale: 1.05,
                    boxShadow: "0 8px 12px rgba(16, 185, 129, 0.4)",
                    transition: { duration: 0.2, ease: "easeOut" },
                }}
                whileTap={{
                    scale: 0.95,
                    transition: { duration: 0.1, ease: "easeIn" },
                }}
            >
                {children}
            </MotionLinkButton>
        </motion.div>
    );
};

export default GoBackButton;
