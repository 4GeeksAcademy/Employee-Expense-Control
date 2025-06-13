import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { delay: 0.3, duration: 0.5, ease: "easeOut" } },
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5 } },
};

const inputVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { delay: 0.7, duration: 0.5, ease: "easeOut" } },
};

const styles = {
  container: {
    maxWidth: "100%",
  },
  card: {
    maxWidth: "500px",
    width: "100%",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.05)",
    padding: "30px",
    transition: "transform 0.3s ease-in-out",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#2d3748",
    marginBottom: "30px",
    textAlign: "center",
    letterSpacing: "-0.025em",
  },
  label: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#4a5568",
    marginBottom: "8px",
    display: "block",
  },
  input: {
    padding: "12px 15px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    width: "100%",
    fontSize: "1rem",
    color: "#2d3748",
    boxSizing: "border-box",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    "&:focus": { // Esto es CSS-in-JS, en React se manejaría con estado o una librería como emotion/styled-components
      borderColor: "#4f46e5",
      boxShadow: "0 0 0 3px rgba(79, 70, 229, 0.2)",
      outline: "none",
    },
  },
  button: {
    padding: "12px 25px",
    background: "linear-gradient(to right, #404040, #448F73)",
    color: "white",
    fontWeight: "700",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "1.1rem",
    boxShadow: "0 4px 10px rgba(79, 70, 229, 0.3)",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 15px rgba(79, 70, 229, 0.4)",
    },
  },
    buttonWrapperBottom: {
    display: "flex",
    justifyContent: "center",
    marginTop: "40px",
    marginBottom: "20px",
    width: "100%",
  },
  goHomeButton: {
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
  },
};

export { containerVariants, cardVariants, titleVariants, inputVariants, buttonVariants, styles };