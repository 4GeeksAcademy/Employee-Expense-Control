import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import BudgetDetails from "./BudgetDetails";

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const contentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
        opacity: 1,
        height: "auto",
        transition: { type: "spring", stiffness: 100, damping: 20 },
    },
    exit: {
        opacity: 0,
        height: 0,
        transition: { ease: "easeInOut", duration: 0.3 },
    },
};

const EmployeeBudgetItem = ({ employee, budgets, isExpanded, toggleExpand }) => {
    const totalBudgetAmountForEmployee = budgets.reduce(
        (acc, budget) => acc + parseFloat(budget.amount || 0),
        0
    );

    const totalBillsForEmployee = budgets.reduce(
        (acc, budget) =>
            acc +
            budget.bills.reduce((sum, bill) => sum + parseFloat(bill.amount || 0), 0),
        0
    );

    const totalAvailableForEmployee =
        totalBudgetAmountForEmployee - totalBillsForEmployee;

    return (
        <motion.li
            variants={itemVariants}
            layout
            style={styles.listItem}
        >
            <motion.button
                onClick={() => toggleExpand(employee.id)}
                style={styles.employeeButton}
                aria-expanded={isExpanded}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
            >
                <span style={styles.employeeName}>
                    {employee.name} {employee.last_name}
                </span>
                <motion.span
                    style={styles.expandIcon}
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {isExpanded ? "▲" : "▼"}
                </motion.span>
            </motion.button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        style={styles.expandedContent}
                    >
                        <div style={styles.summaryGrid}>
                            <p>
                                Total Budgeted:{" "}
                                <span style={styles.totalBudget}>
                                    ${totalBudgetAmountForEmployee.toFixed(2)}
                                </span>
                            </p>
                            <p>
                                Total Billed:{" "}
                                <span style={styles.totalBilled}>
                                    ${totalBillsForEmployee.toFixed(2)}
                                </span>
                            </p>
                            <p>
                                Available Balance:{" "}
                                <span
                                    style={{
                                        ...styles.availableBalance,
                                        color: totalAvailableForEmployee >= 0 ? "#16a34a" : "#dc2626",
                                    }}
                                >
                                    ${totalAvailableForEmployee.toFixed(2)}
                                </span>
                            </p>
                        </div>

                        <h3 style={styles.budgetDetailsTitle}>Budget Details:</h3>
                        <div style={styles.budgetList}>
                            {budgets.map((budget) => (
                                <BudgetDetails key={budget.id} budget={budget} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.li>
    );
};

const styles = {
    listItem: {
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        overflow: "hidden",
        transition: "box-shadow 0.3s ease-in-out",
        marginBottom: "16px",
    },
    employeeButton: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "24px",
        textAlign: "left",
        cursor: "pointer",
        backgroundColor: "#f3f4f6",
        border: "none",
        borderRadius: "12px",
        transition: "background-color 0.2s ease-in-out",
        outline: "none",
    },
    employeeName: {
        fontSize: "1.5rem",
        fontWeight: "700",
        color: "#2d3748",
    },
    expandIcon: {
        color: "#4f46e5",
        fontSize: "1.125rem",
        fontWeight: "600",
    },
    expandedContent: {
        padding: "24px",
        borderTop: "1px solid #e2e8f0",
        backgroundColor: "white",
        marginLeft: "20px",
    },
    summaryGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "16px",
        marginBottom: "24px",
        color: "#4a5568",
        fontWeight: "500",
    },
    totalBudget: {
        fontWeight: "700",
        color: "#4f46e5",
    },
    totalBilled: {
        fontWeight: "700",
        color: "#ef4444",
    },
    availableBalance: {
        fontWeight: "700",
    },
    budgetDetailsTitle: {
        fontSize: "1.25rem",
        fontWeight: "600",
        color: "#2d3748",
        marginBottom: "16px",
        paddingBottom: "8px",
        borderBottom: "1px solid #e2e8f0",
    },
    budgetList: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
    },
};

export default EmployeeBudgetItem;