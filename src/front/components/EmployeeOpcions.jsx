import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { authFetch } from "../services/apiInterceptor";

import { FileText, FilePlus, Folder } from "lucide-react";
import { Link } from 'react-router-dom';
import useEmployeeOpcions from "../hooks/useEmployeeOpcions";
import { useAuth } from "../hooks/AuthContext.jsx";

import EmpDashboardHeader from "../DesignComponents/EmployeeHome/EmpDashboardHeader";
import EmpSectionDivider from "../DesignComponents/EmployeeHome/EmpSectionDivider";
import EmpSidebar from "../DesignComponents/EmployeeHome/EmpSidebar";
import EmpWelcomePanel from "../DesignComponents/EmployeeHome/EmpWelcomePanel";
import EmpCardGrid from "../DesignComponents/EmployeeHome/EmpCardGrid";


const EmployeeOpcions = () => {
  useEmployeeOpcions();

  const [showLargeScreenElements, setShowLargeScreenElements] = useState(window.innerWidth >= 768);
  const {user} = useAuth();
  const [hasAcceptedBudget, setHasAcceptedBudget]= useState(false)
  const [loadingBudgets, setLoadingBudgets] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowLargeScreenElements(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


useEffect(() => {
  const checkAcceptedBudgets = async () => {
    try {
      const response = await authFetch('/mybudgets', { method: 'GET' });
      const data = await response.json();
      console.log("Respuesta completa de /mybudgets:", data);
      const budgetList = data?.budget_list || [];

            console.log("Lista de presupuestos recibida:", budgetList);
        const accepted = budgetList.some(b => {
                console.log(`Presupuesto ID: ${b.id}, State: ${b.state}`);//PRUEBA CARLOS SI FUNCIONA QUITA LOS CONSOLE.LOG
                // *** CAMBIO AQUÍ ***
                return b.state?.toUpperCase() === 'ACCEPTED';
                
            });
      setHasAcceptedBudget(accepted);
      console.log("¿Hay algún presupuesto 'accepted'?", accepted); //QUITARLO SI PASA LA PRUEBA
    } catch (error) {
      console.error("Error checking accepted budgets", error);
    } finally {
      setLoadingBudgets(false);
    }
  };

  if (user?.id) {
    checkAcceptedBudgets();
  }
}, [user]);

  const options = [
    {
      label: "Create New Budget",
      icon: <FileText size={28} />,
      to: "/createbudget",
      bgColor: "bg-blue-600",
      hoverColor: "hover:bg-blue-700"
    },
    {
       label: "Enter New Bill",
    icon: <FilePlus size={28} />,
    to: hasAcceptedBudget ? "/enterbill" : "#",
    bgColor: hasAcceptedBudget ? "bg-green-600" : "bg-gray-400",
    hoverColor: hasAcceptedBudget ? "hover:bg-green-700" : "cursor-not-allowed",
    disabled: !hasAcceptedBudget
    },
    {
      label: "My Budgets",
      icon: <Folder size={28} />,
      to: "/mybudgets",
      bgColor: "bg-purple-600",
      hoverColor: "hover:bg-purple-700"
    },
    {
      label: "Get My ID",
      icon: <span role="img" aria-label="search">🔍</span>,
      to: "/employeeid",
      bgColor: "bg-yellow-500",
      hoverColor: "hover:bg-yellow-600"
    }
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      {showLargeScreenElements && <EmpSidebar />}

      <main style={{ flexGrow: 1, padding: "2rem" }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <EmpDashboardHeader />
          {showLargeScreenElements && <EmpWelcomePanel />}
          <EmpSectionDivider />

          {!loadingBudgets && (
           <EmpCardGrid hasAcceptedBudget={hasAcceptedBudget} />
                                      )}
        </motion.div>
        
      </main>
      
    </div>
    
  );
};

export default EmployeeOpcions;