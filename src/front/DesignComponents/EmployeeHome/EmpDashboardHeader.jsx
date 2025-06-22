import { motion } from "framer-motion";
import { useAuth } from "../../hooks/AuthContext";

const EmpDashboardHeader = () => {

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
                border: "1px groove #404040",
                paddingTop: "10px"
            }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h1
                className="text-4xl font-extrabold text-gray-800 mb-3 tracking-tight"
                variants={itemVariants}
            >
                Welcome, 
                  <motion.span
                    style={{
                background: "#9E7515",
                paddingTop: "0px"
            }}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
                    className="inline-block ml-3"
                >
                    {user.name}
                </motion.span>
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
                Your panel is ready to help you organize budgets, track expenses, and access key reports with ease.
            </motion.p>
        </motion.div>
    );
};

export default EmpDashboardHeader;