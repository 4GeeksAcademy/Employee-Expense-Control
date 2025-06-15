import { motion } from "framer-motion";
import { useAuth } from "../../hooks/AuthContext";


const DashboardHeader = () => {
   
     const { user } = useAuth();

    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                when: "beforeChildren",
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <motion.div
            className="dashboard-header text-center mb-16 p-8 rounded-xl shadow-lg"
            style={{
                background: "#F9FAFB",
                border: "1px solid #E5E7EB",
            }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h1
                className="text-4xl font-extrabold text-gray-800 mb-3 tracking-tight"
                variants={itemVariants}
            >
                Welcome, {user.name}     
                <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
                    className="inline-block ml-3"
                >
                    👋
                </motion.span>
            </motion.h1>
            <motion.p
                className="text-xl text-gray-600 font-light max-w-2xl mx-auto"
                variants={itemVariants}
                style={{ lineHeight: "1.6" }}
            >
                Use this panel to manage your budgets, key assignments, and strategic reports.
            </motion.p>
        </motion.div>
    );
};

export default DashboardHeader;