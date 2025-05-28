import useAssignDepartmentSupervisor from "../hooks/useAssignDepartmentSupervisor"
const AssignDepartmentSupervisorForm = () => {
    const {
        idSupervisor,
        setIdSupervisor,
        idDepartment,
        setIdDepartment,
        assignDepartmentSupervisor,
        navigate
    } = useAssignDepartmentSupervisor()

    const handleSubmit = (e) => {
        e.preventDefault()
        assignDepartmentSupervisor(idSupervisor, idDepartment)
        navigate("/supervisor")
    }
    return (<>
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow-lg p-4" style={{ maxWidth: "500px", width: "100%" }}>
                <h2 className="text-center mb-4">Assign Department to Supervisor</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="idEmployee" className="form-label">Employee ID</label>
                        <input
                            type="number"
                            className="form-control"
                            id="idEmployee"
                            value={idSupervisor}
                            onChange={(e) => setIdSupervisor(e.target.value)}
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
    </>)
}

export default AssignDepartmentSupervisorForm