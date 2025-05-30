import { useState, useEffect } from "react"
import useGlobalReducer from "./useGlobalReducer"
import { useNavigate } from "react-router-dom"
import { budgetValidation, supervisorBudgetFetch } from "../services/apiServicesFetch"


const useSupervisorBudget = () => {
    const { store, dispatch } = useGlobalReducer();
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [editedAmount, setEditedAmount] = useState({});

    const navigate = useNavigate()
    useEffect(() => {
          supervisorBudgetFetch(dispatch);
 }, [dispatch]);

    return { store, dispatch, selectedEmployeeId, setSelectedEmployeeId, editedAmount, setEditedAmount, budgetValidation , navigate}
}

export default useSupervisorBudget