import React from "react";
import { motion } from "framer-motion";
import {
  cardVariants,
  titleVariants,
  inputVariants,
  buttonVariants,
  styles,
} from "./AssignEmployeeFormStyles"; // Importa los estilos y variants

const AssignEmployeeCard = ({
  idEmployee,
  setIdEmployee,
  idDepartment,
  setIdDepartment,
  handleSubmit,
}) => {
  return (
    <motion.div
      className="card shadow-lg p-4"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      style={styles.card}
    >
      <motion.h2 variants={titleVariants} style={styles.title}>
        Assign Department to Employee
      </motion.h2>
      <form onSubmit={handleSubmit}>
        <motion.div className="mb-3" variants={inputVariants}>
          <label htmlFor="idEmployee" style={styles.label}>
            Employee ID
          </label>
          <input
            type="number"
            style={styles.input}
            id="idEmployee"
            value={idEmployee}
            onChange={(e) => setIdEmployee(e.target.value)}
            required
          />
        </motion.div>

        <motion.div className="mb-3" variants={inputVariants}>
          <label htmlFor="idDepartment" style={styles.label}>
            Department ID
          </label>
          <input
            type="number"
            style={styles.input}
            id="idDepartment"
            value={idDepartment}
            onChange={(e) => setIdDepartment(e.target.value)}
            required
          />
        </motion.div>

        <motion.button
          type="submit"
          style={styles.button}
          variants={buttonVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Assign
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AssignEmployeeCard;

// import React from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom"; // Necesario si el botón de regreso está aquí

// // Importa SOLO las variables de estilo/animación desde el nuevo archivo de variables
// import {
//   containerVariants,
//   cardVariants,
//   titleVariants,
//   inputVariants,
//   buttonVariants,
//   styles,
// } from "./formAnimationsAndStyles"; // RUTA RELATIVA AL ARCHIVO DE ESTILOS

// const MotionLinkButton = motion(Link);

// const AssignEmployeeCard = ({
//   idEmployee,
//   setIdEmployee,
//   idDepartment,
//   setIdDepartment,
//   handleSubmit,
// }) => {
//   return (
//     <motion.div
//       className="container d-flex justify-content-center align-items-center min-vh-100"
//       variants={containerVariants} // Aplica los variants del contenedor aquí
//       initial="hidden"
//       animate="visible"
//       style={styles.container} // Aplica el estilo del contenedor aquí
//     >
//       <motion.div
//         className="card shadow-lg p-4"
//         variants={cardVariants} // Aplica los variants de la tarjeta aquí
//         initial="hidden"
//         animate="visible"
//         style={styles.card} // Aplica el estilo de la tarjeta aquí
//       >
//         <motion.h2 variants={titleVariants} style={styles.title}>
//           Assign Department to Employee
//         </motion.h2>
//         <form onSubmit={handleSubmit}>
//           <motion.div className="mb-3" variants={inputVariants}>
//             <label htmlFor="idEmployee" style={styles.label}>
//               Employee ID
//             </label>
//             <input
//               type="number"
//               style={styles.input}
//               id="idEmployee"
//               value={idEmployee}
//               onChange={(e) => setIdEmployee(e.target.value)}
//               required
//             />
//           </motion.div>

//           <motion.div className="mb-3" variants={inputVariants}>
//             <label htmlFor="idDepartment" style={styles.label}>
//               Department ID
//             </label>
//             <input
//               type="number"
//               style={styles.input}
//               id="idDepartment"
//               value={idDepartment}
//               onChange={(e) => setIdDepartment(e.target.value)}
//               required
//             />
//           </motion.div>

//           <motion.button
//             type="submit"
//             style={styles.button}
//             variants={buttonVariants}
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             Assign
//           </motion.button>
//         </form>
//       </motion.div>

//       {/* El botón de regreso también es parte de la presentación del formulario */}
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

// export default AssignEmployeeCard;