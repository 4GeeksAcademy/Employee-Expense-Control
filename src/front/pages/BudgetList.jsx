import useBudgetList from "../hooks/useBudgetList"
const BudgetList = () => {
    const { budgets } = useBudgetList()
    return (
        <>
            <ol className="space-y-4">
                {budgets.map((budget, index) => (
                    <li
                        key={index}
                        className="bg-white shadow-md rounded-lg border border-gray-200"
                    >
                        {/* Cabecera del budget (clickeable) */}
                        <div className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100">
                            <span className="text-gray-800 font-medium">
                                {budget.budget_description}
                            </span>
                            <div className="space-x-2">
                                <button className="px-3 py-1 text-sm bg-blue-500 text-black rounded hover:bg-blue-600">
                                    Editar
                                </button>
                                <button className="px-3 py-1 text-sm bg-red-500 text-black rounded hover:bg-red-600">
                                    Eliminar
                                </button>
                            </div>
                        </div>

                        <div className="px-4 pb-4">
                            <p className="text-sm text-gray-600 mb-2">Estado: <span className="font-semibold text-gray-800">{budget.status}</span></p>

                            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                {budget.bills.map((bill, index) => (
                                    <li key={index}>{bill.trip_description}</li>
                                ))}
                            </ul>
                        </div>
                    </li>
                ))}
            </ol>

        </>
    )
}

export default BudgetList