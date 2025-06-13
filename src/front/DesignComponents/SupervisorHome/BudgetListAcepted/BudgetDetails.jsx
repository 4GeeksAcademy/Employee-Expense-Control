import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import BillList from "./BillList"; // Importamos el nuevo componente

const budgetItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const BudgetDetails = ({ budget }) => {
  const totalBillsAmount = budget.bills.reduce(
    (acc, bill) => acc + parseFloat(bill.amount || 0),
    0
  );
  const availableBudget = parseFloat(budget.amount || 0) - totalBillsAmount;

  return (
    <motion.div
      variants={budgetItemVariants}
      style={styles.budgetItem}
    >
      <p style={styles.budgetDescription}>
        Descripción:{" "}
        <span style={styles.budgetDescriptionNormal}>
          {budget.budget_description || "Sin descripción"}
        </span>
      </p>
      <p style={styles.budgetText}>
        Monto Presupuestado:{" "}
        <span style={styles.budgetAmount}>
          ${parseFloat(budget.amount).toFixed(2)}
        </span>
      </p>
      <p style={styles.budgetText}>
        Monto Facturado:{" "}
        <span style={styles.billedAmount}>
          ${totalBillsAmount.toFixed(2)}
        </span>
      </p>
      <p style={styles.budgetTextLast}>
        Saldo Disponible:{" "}
        <span
          style={{
            ...styles.availableBudget,
            color: availableBudget >= 0 ? "#16a34a" : "#dc2626", 
          }}
        >
          ${availableBudget.toFixed(2)}
        </span>
      </p>

      {budget.bills.length > 0 ? (
        <BillList bills={budget.bills} />
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={styles.noBillsText}
        >
          No hay facturas asociadas a este presupuesto.
        </motion.p>
      )}
    </motion.div>
  );
};

const styles = {
  budgetItem: {
    backgroundColor: "white",
    border: "1px solid #e2e8f0", 
    borderRadius: "8px", 
    padding: "16px",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)", 
  },
  budgetDescription: {
    color: "#1a202c", 
    fontSize: "1.125rem", 
    fontWeight: "600", 
    marginBottom: "8px",
  },
  budgetDescriptionNormal: {
    fontWeight: "400", 
    color: "#4a5568", 
  },
  budgetText: {
    color: "#1a202c",
    marginBottom: "4px",
  },
  budgetTextLast: {
    color: "#1a202c", 
    marginBottom: "12px",
  },
  budgetAmount: {
    fontWeight: "700", 
    color: "#2563eb", 
  },
  billedAmount: {
    fontWeight: "700", 
    color: "#ef4444", 
  },
  availableBudget: {
    fontWeight: "700", 
  },
  noBillsText: {
    color: "#a0a0a0", 
    fontSize: "0.875rem", 
    fontStyle: "italic",
  },
};

export default BudgetDetails;