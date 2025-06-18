import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useAssignDepartmentEmployee from "../hooks/useAssignDeparmentEmployee";
import AssignEmployeeCard from "../DesignComponents/SupervisorHome/StyleAssignEmployee/AssignEmployeeCard";
import { containerVariants, styles } from "../DesignComponents/SupervisorHome/StyleAssignEmployee/AssignEmployeeFormStyles";

const AssignDepartmentEmployeeForm = () => {
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const {
    idEmployee,
    setIdEmployee,
    idDepartment,
    setIdDepartment,
    assignDepartmentEmployee,
    navigate,
  } = useAssignDepartmentEmployee();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await assignDepartmentEmployee(idEmployee, idDepartment);

    if (result?.message) {
      setMessage(result.message);
      setMessageType(result.success ? "success" : "error");
    }

    if (result?.success) {
      setTimeout(() => {
        navigate("/supervisor");
      }, 2000);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={styles.container}
    >
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            padding: "10px 20px",
            marginBottom: "20px",
            marginTop: "40px",       
            marginLeft: "auto",      
            marginRight: "auto",
            borderRadius: "8px",
            color: messageType === "success" ? "#155724" : "#721c24",
            backgroundColor: messageType === "success" ? "#d4edda" : "#f8d7da",
            border: messageType === "success" ? "1px solid #c3e6cb" : "1px solid #f5c6cb",
            fontWeight: "bold",
            maxWidth: "500px",
            textAlign: "center",
          }}
        >
          {message}
        </motion.div>
      )}

      <AssignEmployeeCard
        idEmployee={idEmployee}
        setIdEmployee={setIdEmployee}
        idDepartment={idDepartment}
        setIdDepartment={setIdDepartment}
        handleSubmit={handleSubmit}
      />
    </motion.div>
  );
};

export default AssignDepartmentEmployeeForm;
