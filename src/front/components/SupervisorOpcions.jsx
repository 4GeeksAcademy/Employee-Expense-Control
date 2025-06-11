import { motion } from "framer-motion";
import CardGrid from "../DesignComponents/CardGrid";
import DashboardHeader from "../DesignComponents/DashboardHeader";
import useSupervisorOpcions from "../hooks/useSupervisorOpcions"
const SupervisorOpcions = () => {
    useSupervisorOpcions()
    return (<>
        <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6", padding: "2rem" }}>
            <DashboardHeader />
            <CardGrid />
        </div>
    </>)
}

export default SupervisorOpcions