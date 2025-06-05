import useBudgetAccepted from "../hooks/useBudgetAccepted";
import { Link } from "react-router-dom";

const BudgetAccepted = () => {
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

    const employees = Object.values(budgetsByEmployee);

    const toggleExpand = (employeeId) => {
        setExpandedEmployeeId((prev) => (prev === employeeId ? null : employeeId));
    };

    return (
        <div>
            <Link
                to="/supervisor"
                className="inline-block mb-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
                <button type="button" class="btn btn-primary">Go Home</button>
            </Link>
            <h2>Presupuestos Aprobados por Empleado</h2>
            {employees.length === 0 ? (
                <p>No hay presupuestos aprobados.</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {employees.map(({ employee, budgets }) => {
                        const totalBudgetAmountForEmployee = budgets.reduce(
                            (acc, budget) => acc + parseFloat(budget.amount || 0),
                            0
                        );

                        const totalBillsForEmployee = budgets.reduce(
                            (acc, budget) =>
                                acc +
                                budget.bills.reduce(
                                    (sum, bill) => sum + parseFloat(bill.amount || 0),
                                    0
                                ),
                            0
                        );

                        const totalAvailableForEmployee =
                            totalBudgetAmountForEmployee - totalBillsForEmployee;

                        return (
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
                                        {budgets.map((budget) => {
                                            const totalBillsAmount = budget.bills.reduce(
                                                (acc, bill) => acc + parseFloat(bill.amount || 0),
                                                0
                                            );
                                            return (
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
                                                    <p><strong>Total en Facturas:</strong> ${totalBillsForEmployee.toFixed(2)}</p>
                                                    <p>
                                                        <strong>Disponible:</strong> ${totalAvailableForEmployee.toFixed(2)}
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
                                                                        <p>
                                                                            <strong>Monto:</strong> ${parseFloat(bill.amount).toFixed(2)}
                                                                        </p>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </>
                                                    ) : (
                                                        <p>No hay facturas asociadas.</p>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default BudgetAccepted;
