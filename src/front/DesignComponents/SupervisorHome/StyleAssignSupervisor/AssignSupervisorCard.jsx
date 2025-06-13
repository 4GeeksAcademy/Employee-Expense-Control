import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  containerVariants,
  cardVariants,
  titleVariants,
  inputVariants,
  buttonVariants,
  styles, // Asegúrate de que styles incluye buttonWrapperBottom y goHomeButton
} from "./AssignSupervisorFormStyles"; // Asumo que este es tu archivo de constantes de estilos

const MotionLinkButton = motion(Link);

const AssignSupervisorCard = ({
  idEmployee,
  setIdEmployee,
  idDepartment,
  setIdDepartment,
  handleSubmit,
}) => {
  return (
    // Este es el contenedor principal que centra todo
    <motion.div
      className="container d-flex flex-column justify-content-center align-items-center min-vh-100" // AGREGADO: flex-column para apilar elementos verticalmente
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={styles.container}
    >
      {/* La tarjeta del formulario */}
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
          {/* ... tus campos de formulario ... */}
          <motion.div className="mb-3" variants={inputVariants}>
            <label htmlFor="idEmployee" style={styles.label}>
              Supervisor ID
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

      {/* El botón de regreso, ahora dentro de AssignSupervisorCard */}
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

export default AssignSupervisorCard;