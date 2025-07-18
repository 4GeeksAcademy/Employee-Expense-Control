import { FaUserShield, FaChartPie, FaSignOutAlt, FaMoneyBillWave, FaDollarSign, FaFileInvoiceDollar, FaRegChartBar, FaUsers, FaCog, FaHistory } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate} from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import { useState, useEffect } from "react";

// No es necesario importar SupervisorHome.css aquí si ya está importado en SupervisorOpcions.jsx
// ya que Sidebar es un hijo de SupervisorOpcions.

const EmpSidebar = ({ className }) => { // Acepta la prop className

  const { isAuthenticated, logout } = useAuth();
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("error when closing session:", error);
    } finally {
      setLoading(false);
    }
  };

    const menuItems = [
        { icon: <FaUserShield />, text: "Profile" },
        { icon: <FaChartPie />, text: "Overview" },
        { icon: <FaMoneyBillWave />, text: "Approve Budgets" },
        { icon: <FaFileInvoiceDollar />, text: "Approve Bills" },
        { icon: <FaDollarSign />, text: "Budget Requests" },
        { icon: <FaRegChartBar />, text: "Reporting" },
        { icon: <FaHistory />, text: "Approval History" },
        { icon: <FaUsers />, text: "Manage Users" },
        { icon: <FaCog />, text: "Settings" },
        { icon: <FaSignOutAlt />, text: "Logout", onClick: handleLogout},
    ];

    const sidebarVariants = {
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                when: "beforeChildren",
                staggerChildren: 0.1,
            },
        },
        hidden: {
            opacity: 0,
            x: -50,
        },
    };

    const itemVariants = {
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10,
            },
        },
        hidden: {
            opacity: 0,
            x: -20,
        },
        hover: {
            scale: 1.05,
            x: 10,
            color: "#93c5fd",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 10,
            },
        },
        tap: {
            scale: 0.95,
            backgroundColor: "#3b82f6",
            color: "white",
            transition: {
                duration: 0.1,
                ease: "easeOut",
            },
        },
    };

    const iconVariants = {
        hover: {
            rotate: 10,
            scale: 1.1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 10
            }
        },
        tap: {
            scale: 0.9
        }
    };


    return (
        <motion.div
            className={className} 
            style={{
                
                backgroundColor: "#404040", //#1f2937 //#9E7515
                color: "white",
                display: "flex", 
                flexDirection: "column",
                padding: "1.5rem",
                boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
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
                    color: "#FFFFFF",
                }}
            >
                Employee Panel
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
                         onClick={item.onClick} //  This enables the logout function
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            padding: "0.75rem 1rem",
                            borderRadius: "0.5rem",
                            cursor: "pointer",
                            transition: "background-color 0.2s ease-in-out",
                        }}
                        variants={itemVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <motion.span
                            variants={iconVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            {item.icon}
                        </motion.span>
                        {item.text}
                    </motion.span>
                ))}
            </nav>
        </motion.div>
    );
};

export default EmpSidebar;