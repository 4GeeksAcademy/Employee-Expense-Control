import useSupervisorBudget from "../hooks/useSupervisorBudget"



const BudgetsPending = () => {
    const { store, dispatch, selectedEmployeeId, setSelectedEmployeeId, editedAmount, setEditedAmount, budgetValidation, navigate} = useSupervisorBudget()
    const handleAccept = async (budgetId, amount) => {
        budgetValidation(dispatch, budgetId, "accepted", amount)
        console.log("Aceptar", budgetId, amount);
    };

    const handleReject = async (budgetId) => {
        budgetValidation(dispatch, budgetId, "rejected")
        console.log("Rechazar", budgetId);
    };

    const handleAmountChange = (budgetId, newAmount) => {
        setEditedAmount((prev) => ({ ...prev, [budgetId]: newAmount }));
    };

    const pendingBudgets = store.budgets.filter(
        (b) => b.state === "PENDING"
    );

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
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Budgets Pendientes</h2>

            {filteredBudgets.length === 0 ? (
                <p className="text-gray-600">No hay budgets por aprobar.</p>
            ) : (
                filteredBudgets.map((budget) => (
                    <div key={budget.id} className="border p-4 mb-4 rounded shadow">
                        <p>
                            <strong>Descripción:</strong> {budget.budget_description}
                        </p>
                        <p>
                            <strong>Monto Solicitado:</strong>{" "}
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
                            <strong>Empleado:</strong>{" "}
                            <button
                                onClick={() => setSelectedEmployeeId(budget.employee_id)}
                                className="text-blue-600 underline"
                            >
                                {getEmployeeName(budget.employee_id)}
                            </button>
                        </p>

                        <div className="mt-2 space-x-2">
                            <button
                                onClick={() =>
                                    handleAccept(budget.id, editedAmount[budget.id] || budget.amount)
                                }
                                className="bg-green-500 text-black px-3 py-1 rounded"
                            >
                                Aceptar
                            </button>
                            <button
                                onClick={() => handleReject(budget.id)}
                                className="bg-red-500 text-black px-3 py-1 rounded"
                            >
                                Rechazar
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
    </>)
}

export default BudgetsPending