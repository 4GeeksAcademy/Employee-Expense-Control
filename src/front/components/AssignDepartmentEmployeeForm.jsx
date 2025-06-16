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
      className="container d-flex flex-column justify-content-center align-items-center min-vh-100" // AÑADE flex-column aquí
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={styles.container} // Este styles.container debe ser solo para el contenedor principal
    >
      {/* Este es el componente de la tarjeta */}
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

