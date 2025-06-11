import useBudgetList from "../hooks/useBudgetList";
import { editBill, deleteBill } from "../services/apiServicesFetch";
import { Link } from "react-router-dom";

const BudgetListComponent = () => {
    const {
        budgets,
        dispatch,
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

    const handleDeleteBill = (billId, budgetId) => {
        deleteBill(billId, budgetId, dispatch);
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
        editBill(billId, editedBill, dispatch);
        setEditingBillId(null);
    };

    // ✅ Validación: si budgets no es un array, mostramos mensaje de carga
    if (!Array.isArray(budgets)) {
        return (
            <div className="p-4">
                <p className="text-gray-600">Loading budgets...</p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <Link
                to="/employeehome"
                className="inline-block mb-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
                <button type="button" className="btn btn-primary">Go Home</button>
            </Link>
            {console.log(budgets)}

            <ol className="space-y-6">
                {budgets.map((budget, index) => {
                    const totalBills = budget.bills.reduce(
                        (acc, bill) => acc + parseFloat(bill.amount || 0),
                        0
                    );

                    return (
                        <li
                            key={index}
                            className="bg-white shadow-lg rounded-2xl border border-gray-200 overflow-hidden"
                        >
                            <div className="flex justify-between items-center px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                                <span className="text-lg font-semibold text-gray-800">
                                    {budget.budget_description}
                                </span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => toggleBills(index)}
                                        className="px-4 py-1.5 text-sm bg-emerald-500 text-black rounded-lg hover:bg-emerald-600 transition"
                                    >
                                        {expandedBudgets[index] ? "Hide bills" : "See bills"}
                                    </button>
                                    <button className="px-4 py-1.5 text-sm bg-blue-500 text-black rounded-lg hover:bg-blue-600 transition">
                                        Edit
                                    </button>
                                    <button className="px-4 py-1.5 text-sm bg-red-500 text-black rounded-lg hover:bg-red-600 transition">
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="px-6 pb-6">
                                <p className="text-sm text-gray-500 mt-3">
                                    <span className="font-semibold text-gray-700">Status:</span>{" "}
                                    {budget.state}
                                </p>
                                <p className="text-sm text-gray-500 mt-3">
                                    <span className="font-semibold text-gray-700">Budget amount:</span>{" "}
                                    ${parseFloat(budget.amount).toFixed(2)}
                                </p>

                                <p className="text-sm font-medium text-gray-800 mb-4">
                                    Total Bills: <span className="text-green-600 font-bold">${totalBills.toFixed(2)}</span>
                                </p>

                                <p className="text-sm text-gray-500 mt-3">
                                    <span className="font-semibold text-gray-700">available:</span>{" "}
                                    ${(budget.amount - totalBills).toFixed(2)}
                                </p>

                                {expandedBudgets[index] && (
                                    <ul className="space-y-4 text-sm">
                                        {budget.bills.map((bill, billIndex) => (
                                            <li key={billIndex} className="ml-2 p-4 bg-gray-50 rounded-xl shadow-sm">
                                                {editingBillId === bill.id ? (
                                                    <div className="space-y-2">
                                                        <div>
                                                            <label className="block font-medium text-gray-700">Description</label>
                                                            <input
                                                                type="text"
                                                                value={editedBill.trip_description}
                                                                onChange={(e) =>
                                                                    setEditedBill((prev) => ({
                                                                        ...prev,
                                                                        trip_description: e.target.value,
                                                                    }))
                                                                }
                                                                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block font-medium text-gray-700">Amount</label>
                                                            <input
                                                                type="number"
                                                                value={editedBill.amount}
                                                                onChange={(e) =>
                                                                    setEditedBill((prev) => ({
                                                                        ...prev,
                                                                        amount: e.target.value,
                                                                    }))
                                                                }
                                                                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block font-medium text-gray-700">Address</label>
                                                            <input
                                                                type="text"
                                                                value={editedBill.trip_address}
                                                                onChange={(e) =>
                                                                    setEditedBill((prev) => ({
                                                                        ...prev,
                                                                        trip_address: e.target.value,
                                                                    }))
                                                                }
                                                                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                                            />
                                                        </div>

                                                        <div className="flex gap-2 mt-3">
                                                            <button
                                                                onClick={() => handleEditSubmit(bill.id)}
                                                                className="px-4 py-1.5 bg-blue-500 text-black text-sm rounded-md hover:bg-blue-600 transition"
                                                            >
                                                                Save
                                                            </button>
                                                            <button
                                                                onClick={() => setEditingBillId(null)}
                                                                className="px-4 py-1.5 bg-gray-400 text-black text-sm rounded-md hover:bg-gray-500 transition"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-1 text-gray-700">
                                                        <p><span className="font-medium">Description:</span> {bill.trip_description}</p>
                                                        <p><span className="font-medium">Amount:</span> ${bill.amount}</p>
                                                        <p><span className="font-medium">State:</span> {bill.state}</p>
                                                        <div className="mt-2 flex gap-2">
                                                            <button
                                                                onClick={() => handleEditClick(bill)}
                                                                className="px-3 py-1 text-sm bg-yellow-400 text-black rounded hover:bg-yellow-500 transition"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteBill(bill.id, bill.budget_id)}
                                                                className="px-3 py-1 text-sm bg-red-400 text-black rounded hover:bg-red-500 transition"
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
        </div>
    );
};

export default BudgetListComponent;
