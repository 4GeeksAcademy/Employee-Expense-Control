import useTotalExpenseDepartment from "../hooks/useTotalExpenseDepartment"
const TotalExpenseDepartmentComponent = () => {
    const { total, openEmployeeIds, setOpenEmployeeIds } = useTotalExpenseDepartment()
    if (!total || Object.keys(total).length === 0) {
        return <p className="text-gray-500">No hay información disponible.</p>;
    }
    const toggleEmployee = (id) => {
        setOpenEmployeeIds((prev) =>
            prev.includes(id)
                ? prev.filter((empId) => empId !== id)
                : [...prev, id]
        );
    };
    return (<>
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Gastos del Departamento</h2>

            <div className="bg-white border border-gray-300 rounded-lg p-4 shadow mb-6">
                <p className="text-lg font-semibold">
                    ID del Departamento: <span className="text-blue-600">{total.department_id}</span>
                </p>
                <p className="text-lg font-semibold mt-2">
                    Total General de Gastos: <span className="text-green-600">${total.total_bills_amount.toFixed(2)}</span>
                </p>
            </div>

            <hr className="my-6 border-gray-300" />

            <h3 className="text-xl font-semibold mb-3 text-center">Gastos por Empleado</h3>

            <div className="space-y-4">
                {total.employees.map((emp) => (
                    <div
                        key={emp.employee_id}
                        className="bg-gray-50 border border-gray-200 rounded-md shadow-sm"
                    >
                        <button
                            onClick={() => toggleEmployee(emp.employee_id)}
                            className="w-full text-left p-4 font-semibold text-gray-800 hover:bg-gray-100 focus:outline-none"
                        >
                            {emp.employee_name} (ID: {emp.employee_id})
                        </button>

                        {openEmployeeIds.includes(emp.employee_id) && (
                            <div className="px-4 pb-4">
                                <p><strong>Total de Gastos:</strong> <span className="text-green-700">${emp.total_bills_amount.toFixed(2)}</span></p>
                                {/* Aquí podrías incluir una lista de gastos si la tienes */}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    </>)

}

export default TotalExpenseDepartmentComponent