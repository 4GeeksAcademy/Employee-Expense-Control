import React from "react";
import { motion } from "framer-motion";
import {
  cardVariants,
  titleVariants,
  inputVariants,
  buttonVariants,
  styles,
} from "./AssignSupervisorFormStyles"; // Importa los estilos y variants

const AssignSupervisorCard = ({
  idSupervisor,
  setIdSupervisor,
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
        Assign Department to Supervisor
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
            value={idSupervisor}
            onChange={(e) => setIdSupervisor(e.target.value)}
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

export default AssignSupervisorCard;