import { FaUserShield, FaChartPie, FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion"; 

const Sidebar = () => {
    
    const sidebarVariants = {
        hidden: { opacity: 0, x: -50 }, 
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }, 
    };

    const itemVariants = {
        hover: { scale: 1.05, x: 10, color: "#93c5fd" }, 
        tap: { scale: 0.95 }, 
    };

    const menuItems = [
        { icon: <FaUserShield />, text: "Profile" },
        { icon: <FaChartPie />, text: "Overview" },
        { icon: <FaSignOutAlt />, text: "Logout" },
    ];

    return (
        <motion.div
            style={{
                width: "250px",
                backgroundColor: "#1f2937",
                color: "white",
                display: "flex",
                flexDirection: "column",
                padding: "1.5rem",
                boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
                borderRadius: "0.75rem", 
            }}
            variants={sidebarVariants} 
            initial="hidden" 
            animate="visible" 
        >
            <h2
                style={{
                    fontSize: "1.5rem",
                    marginBottom: "2rem",
                    fontWeight: "bold",
                    textAlign: "center", 
                    color: "#93c5fd", 
                }}
            >
                Supervisor Panel
            </h2>
            <nav
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                {menuItems.map((item, index) => (
                    <motion.span
                        key={index} 
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem", 
                            padding: "0.75rem 1rem", 
                            borderRadius: "0.5rem",
                            cursor: "pointer", 
                            transition: "background-color 0.2s ease-in-out", 
                        }}
                        whileHover="hover" 
                        whileTap="tap" 
                        variants={itemVariants} 
                    >
                        {item.icon} {item.text}
                    </motion.span>
                ))}
            </nav>
        </motion.div>
    );
};

export default Sidebar;