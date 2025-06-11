import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CardGrid from "../DesignComponents/SupervisorHome/CardGrid";
import DashboardHeader from "../DesignComponents/SupervisorHome/DashboardHeader";
import useSupervisorOpcions from "../hooks/useSupervisorOpcions";
import Sidebar from "../DesignComponents/SupervisorHome/Sidebar";
import WelcomePanel from "../DesignComponents/SupervisorHome/WelcomePanel";
import SectionDivider from "../DesignComponents/SupervisorHome/SectionDivider";

const SupervisorOpcions = () => {
    useSupervisorOpcions();

    // Estado para controlar la visibilidad de elementos en pantallas grandes (Sidebar y WelcomePanel)
    const [showLargeScreenElements, setShowLargeScreenElements] = useState(window.innerWidth >= 768);

    useEffect(() => {
        const handleResize = () => {
            setShowLargeScreenElements(window.innerWidth >= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f9fafb" }}>
                {/* Renderizado condicional del Sidebar */}
                {showLargeScreenElements && <Sidebar />}

                <main style={{ flexGrow: 1, padding: "2rem" }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <DashboardHeader />
                        {/* Renderizado condicional del WelcomePanel */}
                        {showLargeScreenElements && <WelcomePanel />}
                        <SectionDivider />
                        <CardGrid />
                    </motion.div>
                </main>
            </div>
        </>
    );
};

export default SupervisorOpcions;