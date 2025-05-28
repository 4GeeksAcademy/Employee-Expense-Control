import useAssignDepartmentEmployee from "../hooks/useAssignDeparmentEmployee"

const AssignDepartmentEmployeeForm = () => {
    const {
        idEmployee,
        setIdEmployee,
        idDepartment,
        setIdDepartment,
        assignDepartmentEmployee,
        navigate
    } = useAssignDepartmentEmployee()

    const handleSubmit = (e) => {
        e.preventDefault()
        assignDepartmentEmployee(idEmployee, idDepartment)
        navigate("/supervisor")
    }

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow-lg p-4" style={{ maxWidth: "500px", width: "100%" }}>
                <h2 className="text-center mb-4">Assign Department to Employee</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="idEmployee" className="form-label">Employee ID</label>
                        <input
                            type="number"
                            className="form-control"
                            id="idEmployee"
                            value={idEmployee}
                            onChange={(e) => setIdEmployee(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="idDepartment" className="form-label">Department ID</label>
                        <input
                            type="number"
                            className="form-control"
                            id="idDepartment"
                            value={idDepartment}
                            onChange={(e) => setIdDepartment(e.target.value)}
                            required
                        />

                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Assign
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AssignDepartmentEmployeeForm
