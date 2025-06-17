import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useAssignDepartmentEmployee from "../hooks/useAssignDeparmentEmployee";
import AssignEmployeeCard from "../DesignComponents/SupervisorHome/StyleAssignEmployee/AssignEmployeeCard";
import {
  containerVariants,
  styles,
} from "../DesignComponents/SupervisorHome/StyleAssignEmployee/AssignEmployeeFormStyles";

const MotionLinkButton = motion(Link);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await assignDepartmentEmployee(idEmployee, idDepartment);

    console.log(result); // Debug
    setMessage(result.message);
    setMessageType(result.success ? "success" : "error");

    if (result.success) {
      setTimeout(() => {
        navigate("/supervisor");
      }, 2500);
    }
  };

  const messageStyles = {
    padding: "16px 24px",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: "500",
    maxWidth: "600px",
    textAlign: "left",
    marginBottom: "24px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    color: "#fff",
    backgroundColor: messageType === "success" ? "#28a745" : "#dc3545",
    border: "1px solid rgba(0,0,0,0.1)",
  };

  return (
    <motion.div
      className="container"
      style={{
        ...styles.container,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "2rem",
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={messageStyles}
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
