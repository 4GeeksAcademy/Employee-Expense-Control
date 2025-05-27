import useBudgetAccepted from "../hooks/useBudgetAccepted";
const BudgetAccepted = () => {
    const { store, expandedEmployeeId, setExpandedEmployeeId } = useBudgetAccepted()
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

    const employees = Object.values(budgetsByEmployee);

    const toggleExpand = (employeeId) => {
        setExpandedEmployeeId((prev) => (prev === employeeId ? null : employeeId));
    };
    return (<>
        <div>
            <h2>Presupuestos Aprobados por Empleado</h2>
            {employees.length === 0 ? (
                <p>No hay presupuestos aprobados.</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {employees.map(({ employee, budgets }) => (
                        <li key={employee.id} style={{ marginBottom: 16 }}>
                            <button
                                onClick={() => toggleExpand(employee.id)}
                                style={{
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    fontSize: "1.1rem",
                                    background: "none",
                                    border: "none",
                                    color: "#007bff",
                                    textDecoration: "underline",
                                }}
                                aria-expanded={expandedEmployeeId === employee.id}
                            >
                                {employee.name} {employee.last_name}
                            </button>

                            {expandedEmployeeId === employee.id && (
                                <div style={{ marginLeft: 20, marginTop: 8 }}>
                                    {budgets.map((budget) => (
                                        <div
                                            key={budget.id}
                                            style={{
                                                border: "1px solid #ddd",
                                                borderRadius: 4,
                                                padding: 12,
                                                marginBottom: 10,
                                            }}
                                        >
                                            <p>
                                                <strong>Descripción:</strong> {budget.budget_description}
                                            </p>
                                            <p>
                                                <strong>Monto:</strong> ${budget.amount.toFixed(2)}
                                            </p>

                                            {budget.bills.length > 0 ? (
                                                <>
                                                    <strong>Facturas asociadas:</strong>
                                                    <ul>
                                                        {budget.bills.map((bill) => (
                                                            <li key={bill.id}>
                                                                {bill.trip_description || `Factura #${bill.id}`} - Estado:{" "}
                                                                <span
                                                                    style={{
                                                                        color:
                                                                            bill.state === "APPROVED"
                                                                                ? "green"
                                                                                : bill.state === "PENDING"
                                                                                    ? "orange"
                                                                                    : "red",
                                                                        fontWeight: "bold",
                                                                    }}
                                                                >
                                                                    {bill.state}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </>
                                            ) : (
                                                <p>No hay facturas asociadas.</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </>)
}

export default BudgetAccepted