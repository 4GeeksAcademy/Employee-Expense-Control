import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const EmpCardOption = ({ title, to, buttonText, icon, disabled = false}) => {
  const greenStart = "rgb(224, 160, 10)";
  const greenEnd = "#9E7515";
  const mainGreen = "#9E7515";

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        y: -10,
        boxShadow: `0 12px 25px ${mainGreen}33`,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      layout
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "20px",
        padding: "2rem",
        boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
        width: "100%", 
        minHeight: "320px", 
        maxWidth: "300px",
        textAlign: "center",
        border: "1px solid #404040", 
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", 
        alignItems: "center",
      }}
    >
      <div style={{
        fontSize: "2.5rem",
        marginBottom: "1rem",
        color: mainGreen,
        transition: "color 0.3s ease-in-out",
      }}>
        {icon}
      </div>

      <h2 style={{
        fontSize: "1.2rem",
        fontWeight: "700",
        color: "#333333",
        marginBottom: "1rem",
        lineHeight: "1.4",
        wordBreak: "break-word", 
      }}>
        {title}
      </h2>

      <motion.div
        whileHover={{
          scale: 1.05,
          boxShadow: `0 4px 10px ${mainGreen}4D`,
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <Link
          to={to}
          style={{
             display: "inline-block",
             padding: "0.75rem 1.5rem",
             background: disabled
              ? "#d1d5db" // gris claro
              : `linear-gradient(135deg, ${greenStart}, ${greenEnd})`,
               color: "white",
               borderRadius: "10px",
              fontWeight: "600",
              textDecoration: "none",
              pointerEvents: disabled ? "none" : "auto",
              opacity: disabled ? 0.6 : 1,
              cursor: disabled ? "not-allowed" : "pointer",
             transition: "background 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
            boxShadow: disabled ? "none" : `0 2px 5px ${mainGreen}20`,
          }}
        >
          {buttonText}
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default EmpCardOption;
