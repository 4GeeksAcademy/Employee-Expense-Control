import { useState } from "react"
import { assignDepartmentSupervisor } from "../services/apiServicesFetch";
import { useNavigate } from "react-router-dom";
const useAssignDepartmentSupervisor = () => {
    const [idSupervisor, setIdSupervisor] = useState("");
    const [idDepartment, setIdDepartment] = useState("");
    const navigate = useNavigate()
    return {idSupervisor, setIdSupervisor, idDepartment, setIdDepartment, assignDepartmentSupervisor, navigate}
}

export default useAssignDepartmentSupervisor