import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useAssignDepartmentSupervisor from "../hooks/useAssignDepartmentSupervisor";
import AssignSupervisorCard from "../DesignComponents/SupervisorHome/StyleAssignSupervisor/AssignSupervisorCard";
// Asegúrate de que esta ruta es correcta y que AssignSupervisorFormStyles.js exporta 'styles' con buttonWrapperBottom y goHomeButton
import { containerVariants, styles } from "../DesignComponents/SupervisorHome/StyleAssignSupervisor/AssignSupervisorFormStyles";

const MotionLinkButton = motion(Link);

const AssignDepartmentSupervisorForm = () => {
  const {
    idSupervisor,
    setIdSupervisor,
    idDepartment,
    setIdDepartment,
    assignDepartmentSupervisor,
    navigate,
  } = useAssignDepartmentSupervisor();

  const handleSubmit = (e) => {
    e.preventDefault();
    assignDepartmentSupervisor(idSupervisor, idDepartment);
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
      <AssignSupervisorCard
        idEmployee={idSupervisor}
        setIdEmployee={setIdSupervisor}
        idDepartment={idDepartment}
        setIdDepartment={setIdDepartment}
        handleSubmit={handleSubmit}
      />
    </motion.div>
  );
};

export default AssignDepartmentSupervisorForm;