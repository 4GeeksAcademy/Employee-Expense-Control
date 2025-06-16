import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useGlobalReducer from "/workspaces/Employee-Expense-Control/src/front/hooks/useGlobalReducer.jsx"
import {
  fetchAndSetEmployees,
  fetchAndSetDepartments,
} from "../../../services/apiServicesFetch"



import {
  containerVariants,
  cardVariants,
  titleVariants,
  inputVariants,
  buttonVariants,
  styles,
} from "./AssignEmployeeFormStyles";

const MotionLinkButton = motion(Link);

const AssignEmployeeCard = ({
  idEmployee,
  setIdEmployee,
  idDepartment,
  setIdDepartment,
  handleSubmit,
}) => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    fetchAndSetEmployees(dispatch);
    fetchAndSetDepartments(dispatch);
  }, [dispatch]);

  return (
    <motion.div
      className="container d-flex flex-column justify-content-center align-items-center min-vh-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={styles.container}
    >
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
          {/* Employee Select */}
          <motion.div className="mb-3" variants={inputVariants}>
            <label htmlFor="idEmployee" style={styles.label}>
              Select Employee
            </label>
            <select
              id="idEmployee"
              style={styles.input}
              value={idEmployee}
              onChange={(e) => setIdEmployee(e.target.value)}
              required
            >
              <option value="">-- Select Employee --</option>
              {store.employees?.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} (ID: {emp.id})
                </option>
              ))}
            </select>
          </motion.div>

          {/* Department Select */}
          <motion.div className="mb-3" variants={inputVariants}>
            <label htmlFor="idDepartment" style={styles.label}>
              Select Department
            </label>
            <select
              id="idDepartment"
              style={styles.input}
              value={idDepartment}
              onChange={(e) => setIdDepartment(e.target.value)}
              required
            >
              <option value="">-- Select Department --</option>
              {store.departments?.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name} (ID: {dept.id})
                </option>
              ))}
            </select>
          </motion.div>

          {/* Submit Button */}
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

      {/* Back Home Button */}
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
            transition: { duration: 0.2, ease: "easeOut" },
          }}
          whileTap={{ scale: 0.95, transition: { duration: 0.1, ease: "easeIn" } }}
        >
          ⬅ Back to Dashboard
        </MotionLinkButton>
      </motion.div>
    </motion.div>
  );
};

export default AssignEmployeeCard;
