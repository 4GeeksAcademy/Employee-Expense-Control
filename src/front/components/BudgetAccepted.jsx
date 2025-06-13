import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useBudgetAccepted from "../hooks/useBudgetAccepted";
import EmployeeBudgetList from "../DesignComponents/SupervisorHome/BudgetListAcepted/EmployeeBudgetList";

const BudgetAcceptedPage = () => {
    const { store, expandedEmployeeId, setExpandedEmployeeId } = useBudgetAccepted();

    // Filtramos y agrupamos los presupuestos aceptados
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
            <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <Link to="/supervisor" style={styles.goHomeButton}>
                    ← Volver al Inicio
                </Link>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                style={styles.mainTitle}
            >
                Presupuestos Aprobados por Empleado
            </motion.h1>

            {employeesWithBudgets.length === 0 ? (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    style={styles.noBudgetsText}
                >
                    No hay presupuestos aprobados en este momento.
                </motion.p>
            ) : (
                <EmployeeBudgetList
                    employees={employeesWithBudgets}
                    expandedEmployeeId={expandedEmployeeId}
                    toggleExpand={toggleExpand}
                />
            )}
        </motion.div>
    );
};

const styles = {
    container: {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "24px",
        backgroundColor: "#f9fafb", // gray-50
        minHeight: "100vh",
    },
    goHomeButton: {
        display: "inline-block",
        marginBottom: "32px",
        padding: "12px 24px",
        background: "linear-gradient(to right, #4f46e5, #3b82f6)", // from-indigo-500 to-blue-600
        color: "white",
        fontWeight: "600",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        textDecoration: "none",
        transition: "all 0.3s ease-in-out",
    },
    mainTitle: {
        fontSize: "2.25rem", // 4xl
        fontWeight: "800", // extrabold
        color: "#1a202c", // gray-900
        marginBottom: "40px",
        textAlign: "center",
        letterSpacing: "-0.025em", // tracking-tight
    },
    noBudgetsText: {
        textAlign: "center",
        color: "#4a5568", // gray-600
        fontSize: "1.125rem", // lg
    },
};

export default BudgetAcceptedPage;