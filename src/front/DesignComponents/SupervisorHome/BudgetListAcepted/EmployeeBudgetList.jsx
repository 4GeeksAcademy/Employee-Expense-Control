import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import EmployeeBudgetItem from "./EmployeeBudgetItem"; 

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, 
    },
  },
};

const EmployeeBudgetList = ({ employees, expandedEmployeeId, toggleExpand }) => {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={styles.listContainer}
    >
      <AnimatePresence>
        {employees.map(({ employee, budgets }) => (
          <EmployeeBudgetItem
            key={employee.id}
            employee={employee}
            budgets={budgets}
            isExpanded={expandedEmployeeId === employee.id}
            toggleExpand={toggleExpand}
          />
        ))}
      </AnimatePresence>
    </motion.ul>
  );
};

const styles = {
  listContainer: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "24px", 
  },
};

export default EmployeeBudgetList;