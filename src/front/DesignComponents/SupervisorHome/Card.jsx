import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CardOption = ({ title, to, buttonText, icon }) => {
    // Colores principales de tu gradiente
    const greenStart = "#10b981"; // El verde más claro del gradiente
    const greenEnd = "#059669";   // El verde más oscuro del gradiente

    // Un verde intermedio o el color principal para iconos y sombras cuando no es un gradiente
    const mainGreen = "#059669"; // Usamos el verde más oscuro del gradiente como el principal

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
                maxWidth: "300px", 
                textAlign: "center",
                border: "1px solid #e0e0e0", 
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
                fontSize: "1.35rem", 
                fontWeight: "700", 
                color: "#333333", 
                marginBottom: "1rem",
            }}>
                {title}
            </h2>
            <motion.div
                
                whileHover={{
                    scale: 1.05, 
                    
                    boxShadow: `0 4px 10px ${mainGreen}4D`, // Opacidad del 30%
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
                <Link
                    to={to}
                    style={{
                        display: "inline-block",
                        padding: "0.75rem 1.75rem", 
                        background: `linear-gradient(135deg, ${greenStart}, ${greenEnd})`, 
                        color: "white", 
                        borderRadius: "10px", 
                        fontWeight: "600",
                        textDecoration: "none",
                        transition: "background 0.3s ease-in-out, box-shadow 0.3s ease-in-out", 
                        boxShadow: `0 2px 5px ${mainGreen}20`, 
                    }}
                >
                    {buttonText}
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default CardOption;