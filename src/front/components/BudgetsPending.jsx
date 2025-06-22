import { useState } from "react";
import useSupervisorBudget from "../hooks/useSupervisorBudget";
import { AnimatePresence, motion } from "framer-motion";
import PendingBudgetCard from "../DesignComponents/PendingHome/PendingBudgetCard";
import BudgetTitlePanel from "../DesignComponents/PendingHome/BudgetTitlePanel";
import BudgetCardGrid from "../DesignComponents/PendingHome/BudgetCardGrid";
import GoBackButton from "../DesignComponents/GoBackButton/GoBackButton";

const BudgetsPending = () => {
    const [pendingAction, setPendingAction] = useState(null);
    const [pendingBudgetId, setPendingBudgetId] = useState(null);
    const [pendingAmount, setPendingAmount] = useState(null);

    const {
        store,
        dispatch,
        selectedEmployeeId,
        setSelectedEmployeeId,
        editedAmount,
        setEditedAmount,
        budgetValidation
    } = useSupervisorBudget();

    const handleAccept = async (budgetId, amount) => {
        await budgetValidation(dispatch, budgetId, "accepted", amount);
    };

    const handleReject = async (budgetId) => {
        await budgetValidation(dispatch, budgetId, "rejected");
    };

    const handleAmountChange = (budgetId, newAmount) => {
        setEditedAmount((prev) => ({ ...prev, [budgetId]: newAmount }));
    };

    const handleOpenModal = (action, budgetId, amount = null) => {
        setPendingAction(action);
        setPendingBudgetId(budgetId);
        setPendingAmount(amount);
    };

    const handleModalConfirm = async () => {
        if (pendingAction === "accept") {
            await handleAccept(pendingBudgetId, pendingAmount);
        } else if (pendingAction === "reject") {
            await handleReject(pendingBudgetId);
        }

        setPendingAction(null);
        setPendingBudgetId(null);
        setPendingAmount(null);
    };

    const pendingBudgets = store.budgets.filter((b) => b.state === "PENDING");

    const filteredBudgets = selectedEmployeeId
        ? pendingBudgets.filter((b) => b.employee_id === selectedEmployeeId)
        : pendingBudgets;

    const getEmployeeName = (id) => {
        const foundBudget = store.budgets.find((b) => b.employee_id === id);
        if (foundBudget && foundBudget.employee) {
            const { name, last_name } = foundBudget.employee;
            return `${name ?? "Sin nombre"} ${last_name ?? "Sin apellido"}`;
        }
        return "Unknown";
    };

    return (
        <>
            <div className="p-4">
                <BudgetTitlePanel
                    title="Pending Budgets"
                    description={
                        filteredBudgets.length === 0
                            ? "There are no budgets to approve at the moment."
                            : "Review and manage the pending budget requests below."
                    }
                />

                {filteredBudgets.length === 0 ? (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        className="text-gray-600 text-center mt-8"
                    >
                        No pending budgets found.
                    </motion.p>
                ) : (
                    <BudgetCardGrid>
                        {filteredBudgets.map((budget) => (
                            <PendingBudgetCard
                                key={budget.id}
                                budget={budget}
                                editedAmount={editedAmount[budget.id]}
                                onAmountChange={handleAmountChange}
                                onSelectEmployee={setSelectedEmployeeId}
                                onAcceptClick={(id) =>
                                    handleOpenModal("accept", id, editedAmount[id] || budget.amount)
                                }
                                onRejectClick={(id) => handleOpenModal("reject", id)}
                                employeeName={getEmployeeName(budget.employee_id)}
                            />
                        ))}
                    </BudgetCardGrid>
                )}
            </div>

            <div className="text-center" style={{ marginTop: "3rem", marginBottom: "3rem" }}>
                <GoBackButton />
            </div>

            <AnimatePresence>
                {pendingAction && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100vw",
                            height: "100vh",
                            backgroundColor: "rgba(0,0,0,0.4)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 9999
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                background: "#F7FAFC", // gris claro (como en el otro componente)
                                borderRadius: "12px",
                                padding: "2rem",
                                maxWidth: "400px",
                                width: "100%",
                                boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
                            }}
                        >
                            <h3
                                style={{
                                    fontSize: "1.25rem",
                                    marginBottom: "1rem",
                                    color: "#212121"
                                }}
                            >
                                Confirm Budget Action
                            </h3>
                            <p style={{ marginBottom: "1.5rem", color: "#4A5568" }}>
                                {pendingAction === "accept"
                                    ? `Are you sure you want to accept this budget of ${pendingAmount}€?`
                                    : "Are you sure you want to reject this budget?"}
                            </p>
                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
                                <button
                                    onClick={() => {
                                        setPendingAction(null);
                                        setPendingBudgetId(null);
                                        setPendingAmount(null);
                                    }}
                                    style={{
                                        padding: "0.5rem 1rem",
                                        border: "none",
                                        borderRadius: "8px",
                                        backgroundColor: "#6c757d", 
                                        color: "white",
                                        cursor: "pointer"
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleModalConfirm}
                                    style={{
                                        padding: "0.5rem 1rem",
                                        backgroundColor: pendingAction === "accept" ? "#198754" : "#DC3545",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "8px",
                                        cursor: "pointer"
                                    }}
                                >
                                    Confirm
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default BudgetsPending;
