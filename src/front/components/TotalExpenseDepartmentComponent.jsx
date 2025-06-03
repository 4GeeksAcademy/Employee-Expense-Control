import useTotalExpenseDepartment from "../hooks/useTotalExpenseDepartment"
const TotalExpenseDepartmentComponent = () => {
    const { total } = useTotalExpenseDepartment()
    if (!total || Object.keys(total).length === 0) {
        return <p className="text-gray-500">No hay información disponible.</p>;
    }
    return (<>
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Gastos del Departamento</h2>

            <div className="bg-white border border-gray-300 rounded-lg p-4 shadow mb-6">
                <p className="text-lg font-semibold">ID del Departamento: <span className="text-blue-600">{total.department_id}</span></p>
                <p className="text-lg font-semibold mt-2">Total General de Gastos: <span className="text-green-600">${total.total_bills_amount.toFixed(2)}</span></p>
            </div>

            <hr className="my-6 border-gray-300" />

            <h3 className="text-xl font-semibold mb-3 text-center">Gastos por Empleado</h3>

            <div className="space-y-4">
                {total.employees.map((emp) => (
                    <div
                        key={emp.employee_id}
                        className="bg-gray-50 border border-gray-200 rounded-md p-4 shadow-sm"
                    >
                        <p><strong>ID:</strong> {emp.employee_id}</p>
                        <p><strong>Nombre:</strong> {emp.employee_name}</p>
                        <p><strong>Total de Gastos:</strong> <span className="text-green-700">${emp.total_bills_amount.toFixed(2)}</span></p>
                    </div>
                ))}
            </div>
        </div>
    </>)

}

export default TotalExpenseDepartmentComponent