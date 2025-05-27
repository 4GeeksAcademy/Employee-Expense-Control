import useAssignDepartmentEmployee from "../hooks/useAssignDeparmentEmployee"
const AssignDepartmentEmployeeForm = () => {
    const { idEmployee, setIdEmployee, idDepartment, setIdDepartment, assignDepartmentEmployee, navigate } = useAssignDepartmentEmployee()

    const handleSubmit = (e) => {
        e.preventDefault()
        assignDepartmentEmployee(idEmployee, idDepartment)
        navigate("/supervisor")
    }
    return (<>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="idEmployee" className="form-label">Id Employee</label>
                <input type="number" className="form-control" id="idEmployee" aria-describedby="idEmployeeHelp" value={idEmployee} onChange={(e) => setIdEmployee(e.target.value)} />

            </div>
            <div className="mb-3">
                <label htmlFor="idDepartment" className="form-label">Id Department</label>
                <input type="number" className="form-control" id="idDepartemnt" value={idDepartment} onChange={(e) => setIdDepartment(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </>)
}

export default AssignDepartmentEmployeeForm