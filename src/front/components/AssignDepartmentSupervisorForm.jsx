import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useAssignDepartmentSupervisor from "../hooks/useAssignDepartmentSupervisor";
import AssignSupervisorCard from "../DesignComponents/SupervisorHome/StyleAssignSupervisor/AssignSupervisorCard";
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
      className="container d-flex flex-column justify-content-center align-items-center min-vh-100" 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={styles.container} 
    >
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