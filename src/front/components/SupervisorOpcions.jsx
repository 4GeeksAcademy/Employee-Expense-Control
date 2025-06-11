import { motion } from "framer-motion";
import CardGrid from "../DesignComponents/CardGrid";
import DashboardHeader from "../DesignComponents/DashboardHeader";
import useSupervisorOpcions from "../hooks/useSupervisorOpcions"
import Sidebar from "../DesignComponents/Sidebar";
import WelcomePanel from "../DesignComponents/WelcomePanel";
import SectionDivider from "../DesignComponents/SectionDivider";
const SupervisorOpcions = () => {
    useSupervisorOpcions()
    return (<>
        <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f9fafb" }}>
            <Sidebar />
            <main style={{ flexGrow: 1, padding: "2rem" }}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <DashboardHeader />
                    <WelcomePanel />
                    <SectionDivider />
                    <CardGrid />
                </motion.div>
            </main>
        </div>
    </>)
}

export default SupervisorOpcions