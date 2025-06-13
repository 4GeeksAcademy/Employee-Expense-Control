import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useBudgetAccepted from "../hooks/useBudgetAccepted";
import EmployeeBudgetList from "../DesignComponents/SupervisorHome/BudgetListAcepted/EmployeeBudgetList";

const MotionLinkButton = motion(Link);

const BudgetAcceptedPage = () => {
    const { store, expandedEmployeeId, setExpandedEmployeeId } = useBudgetAccepted();

    const approvedBudgets = store.budgets.filter(
        (budget) => budget.state === "ACCEPTED"
    );

    const budgetsByEmployee = approvedBudgets.reduce((acc, budget) => {
        const emp = budget.employee;
        if (!emp) return acc;

        if (!acc[emp.id]) {
            acc[emp.id] = { employee: emp, budgets: [] };
        }
        acc[emp.id].budgets.push(budget);
        return acc;
    }, {});

    const employeesWithBudgets = Object.values(budgetsByEmployee);

    const toggleExpand = (employeeId) => {
        setExpandedEmployeeId((prev) => (prev === employeeId ? null : employeeId));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={styles.container}
        >
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                style={styles.mainTitle}
            >
                Approved Budgets by Employee
            </motion.h1>

            {employeesWithBudgets.length === 0 ? (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    style={styles.noBudgetsText}
                >
                    No approved budgets at this time.
                </motion.p>
            ) : (
                <EmployeeBudgetList
                    employees={employeesWithBudgets}
                    expandedEmployeeId={expandedEmployeeId}
                    toggleExpand={toggleExpand}
                />
            )}

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

const styles = {
    container: {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "24px",
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
    },
    mainTitle: {
        fontSize: "2.25rem",
        fontWeight: "800",
        color: "#1a202c",
        marginBottom: "40px",
        textAlign: "center",
        letterSpacing: "-0.025em",
    },
    noBudgetsText: {
        textAlign: "center",
        color: "#4a5568",
        fontSize: "1.125rem",
    },
    buttonWrapperBottom: {
        display: "flex",
        justifyContent: "center",
        marginTop: "40px",
        marginBottom: "20px",
        width: "100%",
    },
    goHomeButton: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px 24px",
        background: "linear-gradient(to right, #10b981, #059669)",
        color: "white",
        fontWeight: "600",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        textDecoration: "none",
        border: "none",
        cursor: "pointer",
    },
};

export default BudgetAcceptedPage;