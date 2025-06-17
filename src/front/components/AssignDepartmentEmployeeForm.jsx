import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useAssignDepartmentEmployee from "../hooks/useAssignDeparmentEmployee";
import AssignEmployeeCard from "../DesignComponents/SupervisorHome/StyleAssignEmployee/AssignEmployeeCard";
import { containerVariants, styles } from "../DesignComponents/SupervisorHome/StyleAssignEmployee/AssignEmployeeFormStyles";

const MotionLinkButton = motion(Link);

const AssignDepartmentEmployeeForm = () => {
  const {
    idEmployee,
    setIdEmployee,
    idDepartment,
    setIdDepartment,
    assignDepartmentEmployee,
    navigate,
  } = useAssignDepartmentEmployee();

  const handleSubmit = (e) => {
    e.preventDefault();
    assignDepartmentEmployee(idEmployee, idDepartment);
    navigate("/supervisor");
  };

  return (
    <motion.div
      className="container d-flex flex-column justify-content-center align-items-center min-vh-100" 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={styles.container} 
    >
  
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

