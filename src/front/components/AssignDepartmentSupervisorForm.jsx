import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useAssignDepartmentSupervisor from "../hooks/useAssignDepartmentSupervisor";
import AssignSupervisorCard from "../DesignComponents/SupervisorHome/StyleAssignSupervisor/AssignSupervisorCard";
import { containerVariants, styles } from "../DesignComponents/SupervisorHome/StyleAssignSupervisor/AssignSupervisorFormStyles"; // Solo los variants y estilos del contenedor

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
      className="container d-flex justify-content-center align-items-center min-vh-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={styles.container} // Aplica el estilo del contenedor
    >
      <AssignSupervisorCard
        idEmployee={idSupervisor}
        setIdEmployee={setIdSupervisor}
        idDepartment={idDepartment}
        setIdDepartment={setIdDepartment}
        handleSubmit={handleSubmit}
      />

         <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={styles.buttonWrapperBottom}
            >
                <MotionLinkButton
                    to="/supervisor"
                    style={styles.goHomeButton}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0 8px 12px rgba(16, 185, 129, 0.4)",
                        transition: { duration: 0.2, ease: "easeOut" }
                    }}
                    whileTap={{ scale: 0.95, transition: { duration: 0.1, ease: "easeIn" } }}
                >
                    ← Back to Home
                </MotionLinkButton>
            </motion.div>
        </motion.div>
    );
};

export default AssignDepartmentSupervisorForm;


// import useAssignDepartmentSupervisor from "../hooks/useAssignDepartmentSupervisor"
// const AssignDepartmentSupervisorForm = () => {
//     const {
//         idSupervisor,
//         setIdSupervisor,
//         idDepartment,
//         setIdDepartment,
//         assignDepartmentSupervisor,
//         navigate
//     } = useAssignDepartmentSupervisor()

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         assignDepartmentSupervisor(idSupervisor, idDepartment)
//         navigate("/supervisor")
//     }
//     return (<>
//         <div className="container d-flex justify-content-center align-items-center min-vh-100">
//             <div className="card shadow-lg p-4" style={{ maxWidth: "500px", width: "100%" }}>
//                 <h2 className="text-center mb-4">Assign Department to Supervisor</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-3">
//                         <label htmlFor="idEmployee" className="form-label">Employee ID</label>
//                         <input
//                             type="number"
//                             className="form-control"
//                             id="idEmployee"
//                             value={idSupervisor}
//                             onChange={(e) => setIdSupervisor(e.target.value)}
//                             required
//                         />
//                     </div>

//                     <div className="mb-3">
//                         <label htmlFor="idDepartment" className="form-label">Department ID</label>
//                         <input
//                             type="number"
//                             className="form-control"
//                             id="idDepartment"
//                             value={idDepartment}
//                             onChange={(e) => setIdDepartment(e.target.value)}
//                             required
//                         />

//                     </div>

//                     <button type="submit" className="btn btn-primary w-100">
//                         Assign
//                     </button>
//                 </form>
//             </div>
//         </div>
//     </>)
// }

// export default AssignDepartmentSupervisorForm