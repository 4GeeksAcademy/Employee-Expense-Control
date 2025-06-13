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


// import React from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import useAssignDepartmentEmployee from "../hooks/useAssignDeparmentEmployee";
// import AssignEmployeeCard from "../DesignComponents/SupervisorHome/StyleAssignEmployee/AssignEmployeeCard";
// import { containerVariants, styles } from "../DesignComponents/SupervisorHome/StyleAssignEmployee/AssignEmployeeFormStyles"; // Solo los variants y estilos del contenedor

// const MotionLinkButton = motion(Link);

// const AssignDepartmentEmployeeForm = () => {
//   const {
//     idEmployee,
//     setIdEmployee,
//     idDepartment,
//     setIdDepartment,
//     assignDepartmentEmployee,
//     navigate,
//   } = useAssignDepartmentEmployee();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     assignDepartmentEmployee(idEmployee, idDepartment);
//     navigate("/supervisor");
//   };

//   return (
//     <motion.div
//       className="container d-flex justify-content-center align-items-center min-vh-100"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       style={styles.container} // Aplica el estilo del contenedor
//     >
//       <AssignEmployeeCard
//         idEmployee={idEmployee}
//         setIdEmployee={setIdEmployee}
//         idDepartment={idDepartment}
//         setIdDepartment={setIdDepartment}
//         handleSubmit={handleSubmit}
//       />

//       <motion.div
//         initial={{ x: -50, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ delay: 0.2, duration: 0.5 }}
//         style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
//       >
//         <MotionLinkButton
//           to="/supervisor"
//           style={styles.backButton}
//           whileHover={{
//             scale: 1.05,
//             boxShadow: "0 8px 12px rgba(16, 185, 129, 0.4)",
//             transition: { duration: 0.2, ease: "easeOut" },
//           }}
//           whileTap={{ scale: 0.95, transition: { duration: 0.1, ease: "easeIn" } }}
//         >
//           ← Back to Home
//         </MotionLinkButton>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default AssignDepartmentEmployeeForm;