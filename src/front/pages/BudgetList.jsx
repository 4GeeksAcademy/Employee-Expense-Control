import useBudgetList from "../hooks/useBudgetList"

const BudgetList = () => {
    const {
        budgets,
        expandedBudgets,
        setExpandedBudgets,
        editingBillId,
        setEditingBillId,
        editedBill,
        setEditedBill
    } = useBudgetList();

    const toggleBills = (index) => {
        setExpandedBudgets(prev => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const handleDeleteBill = (billId) => {
        // lógica de eliminación
    };

    const handleEditClick = (bill) => {
        setEditingBillId(bill.id);
        setEditedBill({
            trip_description: bill.trip_description,
            amount: bill.amount,
            trip_address: bill.trip_address

        });
    };

    const handleEditSubmit = (billId) => {
        // lógica de actualización
        setEditingBillId(null);
    };
    return (
        <ol className="space-y-4">
            {budgets.map((budget, index) => {
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
                                    {expandedBudgets[index] ? "Hide bills" : "See bills"}
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
                                <ul className="list-disc list-inside text-sm text-black-700 space-y-4">
                                    {budget.bills.map((bill, billIndex) => (
                                        <li key={billIndex} className="ml-4">
                                            {editingBillId === bill.id ? (
                                                <div className="space-y-1">
                                                    <div>
                                                        <label className="font-semibold">Description:</label>
                                                        <input
                                                            type="text"
                                                            value={editedBill.trip_description}
                                                            onChange={(e) =>
                                                                setEditedBill((prev) => ({
                                                                    ...prev,
                                                                    trip_description: e.target.value,
                                                                }))
                                                            }
                                                            className="ml-2 px-2 py-1 border rounded"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="font-semibold">Amount:</label>
                                                        <input
                                                            type="number"
                                                            value={editedBill.amount}
                                                            onChange={(e) =>
                                                                setEditedBill((prev) => ({
                                                                    ...prev,
                                                                    amount: e.target.value,
                                                                }))
                                                            }
                                                            className="ml-2 px-2 py-1 border rounded"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="font-semibold">Address:</label>
                                                        <input
                                                            type="text"
                                                            value={editedBill.trip_address}
                                                            onChange={(e) =>
                                                                setEditedBill((prev) => ({
                                                                    ...prev,
                                                                    trip_address: e.target.value,
                                                                }))
                                                            }
                                                            className="ml-2 px-2 py-1 border rounded"
                                                        />
                                                    </div>

                                                    <button
                                                        onClick={() => handleEditSubmit(bill.id)}
                                                        className="mt-1 px-2 py-1 text-xs bg-blue-500 text-black rounded hover:bg-blue-600"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingBillId(null)}
                                                        className="mt-1 ml-2 px-2 py-1 text-xs bg-gray-400 text-black rounded hover:bg-gray-500"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <p>
                                                        <span className="font-semibold">Description:</span>{" "}
                                                        {bill.trip_description}
                                                    </p>
                                                    <p>
                                                        <span className="font-semibold">Amount:</span> $
                                                        {bill.amount}
                                                    </p>
                                                    <p>
                                                        <span className="font-semibold">State:</span>{" "}
                                                        {bill.state}
                                                    </p>
                                                    <div className="mt-1 space-x-2">
                                                        <button
                                                            onClick={() => handleEditClick(bill)}
                                                            className="px-2 py-1 text-xs bg-yellow-400 text-black rounded hover:bg-yellow-500"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteBill(bill.id)}
                                                            className="px-2 py-1 text-xs bg-red-400 text-black rounded hover:bg-red-600"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
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