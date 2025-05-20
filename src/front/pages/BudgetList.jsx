import useBudgetList from "../hooks/useBudgetList"
const BudgetList = () => {
    const { budgets, expandedBudgets, setExpandedBudgets } = useBudgetList()
    const toggleBills = (index) => {
        setExpandedBudgets((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    }
    return (
        <ol className="space-y-4">
            {budgets.map((budget, index) => {
                // Calcular total de las facturas
                const totalBills = budget.bills.reduce(
                    (acc, bill) => acc + parseFloat(bill.amount || 0),
                    0
                );

                return (
                    <li
                        key={index}
                        className="bg-white shadow-md rounded-lg border border-gray-200"
                    >
                        <div className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100">
                            <span className="text-gray-800 font-medium">
                                {budget.budget_description}
                            </span>
                            <div className="space-x-2">
                                <button
                                    onClick={() => toggleBills(index)}
                                    className="px-3 py-1 text-sm bg-green-500 text-black rounded hover:bg-green-600"
                                >
                                    {expandedBudgets[index] ? "Ocultar bills" : "Ver bills"}
                                </button>
                                <button className="px-3 py-1 text-sm bg-blue-500 text-black rounded hover:bg-blue-600">
                                    Edit
                                </button>
                                <button className="px-3 py-1 text-sm bg-red-500 text-black rounded hover:bg-red-600">
                                    Delete
                                </button>
                            </div>
                        </div>

                        <div className="px-4 pb-4">
                            <p className="text-sm text-gray-600 mb-2">
                                budget status:{" "}
                                <span className="font-semibold text-gray-800">
                                    {budget.state}
                                </span>
                            </p>

                            <p className="text-sm text-gray-800 font-semibold mb-2">
                                Total Bills: ${totalBills.toFixed(2)}
                            </p>

                            {expandedBudgets[index] && (
                                <ul className="list-disc list-inside text-sm text-black-700 space-y-2">
                                    {budget.bills.map((bill, billIndex) => (
                                        <li key={billIndex} className="ml-4">
                                            <p><span className="font-semibold">Description:</span> {bill.trip_description}</p>
                                            <p><span className="font-semibold">Amount:</span> ${bill.amount}</p>
                                            <p><span className="font-semibold">State:</span> {bill.state}</p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </li>
                );
            })}
        </ol>
    )
}

export default BudgetList