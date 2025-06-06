import React, { useState, useEffect } from "react"
import useSupervisorBudget from "../hooks/useSupervisorBudget"
import { Link } from "react-router-dom";

const BudgetsPending = () => {

    const [pendingAction, setPendingAction] = useState(null); // 'accept' or 'reject'
    const [pendingBudgetId, setPendingBudgetId] = useState(null);
    const [pendingAmount, setPendingAmount] = useState(null);

    const { store, dispatch, selectedEmployeeId, setSelectedEmployeeId, editedAmount, setEditedAmount, budgetValidation } = useSupervisorBudget()

    const handleAccept = async (budgetId, amount) => {
        await budgetValidation(dispatch, budgetId, "accepted", amount)
        console.log("Aceptar", budgetId, amount);
    };

    const handleReject = async (budgetId) => {
        await budgetValidation(dispatch, budgetId, "rejected")
        console.log("Rechazar", budgetId);
    };

    const handleAmountChange = (budgetId, newAmount) => {
        setEditedAmount((prev) => ({ ...prev, [budgetId]: newAmount }));
    };

    const handleModalConfirm = async () => {
        if (pendingAction === "accept") {
            await handleAccept(pendingBudgetId, pendingAmount);
        } else if (pendingAction === "reject") {
            await handleReject(pendingBudgetId);
        }

        // Close the Bootstrap modal
        const modal = window.bootstrap.Modal.getInstance(
            document.getElementById("exampleModal")
        );
        if (modal) modal.hide();

        // Reset modal state
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
    return (<>
        <Link
            to="/supervisor"
            className="inline-block mb-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
            <button type="button" class="btn btn-primary">Go Home</button>
        </Link>
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Pending Budgets</h2>

            {filteredBudgets.length === 0 ? (
                <p className="text-gray-600">There are no budgets to approve.</p>
            ) : (
                filteredBudgets.map((budget) => (
                    <div key={budget.id} className="border p-4 mb-4 rounded shadow">
                        <p>
                            <strong>Description:</strong> {budget.budget_description}
                        </p>
                        <p>
                            <strong>Requested Amount:</strong>{" "}
                            <input
                                type="number"
                                value={editedAmount[budget.id] || budget.amount}
                                onChange={(e) =>
                                    handleAmountChange(budget.id, parseFloat(e.target.value))
                                }
                                className="border px-2 py-1 rounded w-32"
                            />
                        </p>
                        <p>
                            <strong>Employee:</strong>{" "}
                            <button
                                onClick={() => setSelectedEmployeeId(budget.employee_id)}
                                className="text-blue-600 underline"
                            >
                                {getEmployeeName(budget.employee_id)}
                            </button>
                        </p>

                        <div className="mt-2 space-x-2">
                            <button
                                type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                onClick={() => {
                                    setPendingAction('accept');
                                    setPendingBudgetId(budget.id);
                                    setPendingAmount(editedAmount[budget.id] || budget.amount);
                                }}
                                class="bg-green-500 text-black px-3 py-1 rounded"
                            >
                                Accept
                            </button>
                            <button
                                type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                onClick={() => {
                                    setPendingAction('reject');
                                    setPendingBudgetId(budget.id);
                                }}
                                class="bg-red-500 text-black px-3 py-1 rounded"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))
            )}

            {selectedEmployeeId && (
                <div className="mt-6">
                    <button
                        onClick={() => setSelectedEmployeeId(null)}
                        className="text-sm text-gray-500 underline"
                    >
                        Ver todos los budgets
                    </button>
                </div>
            )}
        </div>

        {/* Modal */}
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Confirm Budget Action</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {pendingAction === "accept"
                            ? `Are you sure you want to accept this budget of ${pendingAmount}€?`
                            : "Are you sure you want to reject this budget?"}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={handleModalConfirm}>Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default BudgetsPending