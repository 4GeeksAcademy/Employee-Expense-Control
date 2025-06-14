import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { FileText, FilePlus, Folder } from "lucide-react";
import { Link } from 'react-router-dom';
import useEmployeeOpcions from "../hooks/useEmployeeOpcions";
import { useAuth } from "../../hooks/AuthContext.jsx";

import EmpDashboardHeader from "../DesignComponents/EmployeeHome/EmpDashboardHeader";
import EmpSectionDivider from "../DesignComponents/EmployeeHome/EmpSectionDivider";
import EmpSidebar from "../DesignComponents/EmployeeHome/EmpSidebar";
import EmpWelcomePanel from "../DesignComponents/EmployeeHome/EmpWelcomePanel";
import EmpCardGrid from "../DesignComponents/EmployeeHome/EmpCardGrid";


const EmployeeOpcions = () => {
  useEmployeeOpcions();

  const [showLargeScreenElements, setShowLargeScreenElements] = useState(window.innerWidth >= 768);
  const {user} = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setShowLargeScreenElements(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
      to: "/enterbill",
      bgColor: "bg-green-600",
      hoverColor: "hover:bg-green-700"
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

          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Hello {user.name}!</h1>
            <p className="text-gray-600 text-lg hello-employee">
              If you don't have a budget yet, create one and then enter your bills.
            </p>
          </div>

          <EmpCardGrid/>
        </motion.div>
      </main>
    </div>
  );
};

export default EmployeeOpcions;