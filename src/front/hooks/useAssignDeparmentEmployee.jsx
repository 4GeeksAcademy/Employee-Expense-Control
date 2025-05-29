import { useState } from "react"
import { assignDepartmentEmployee } from "../services/apiServicesFetch";
import { useNavigate } from "react-router-dom";
const useAssignDepartmentEmployee = () => {
    const [idEmployee, setIdEmployee] = useState("");
    const [idDepartment, setIdDepartment] = useState("");
    const navigate = useNavigate()
    return { idEmployee, setIdEmployee, idDepartment, setIdDepartment, assignDepartmentEmployee, navigate }
}

export default useAssignDepartmentEmployee