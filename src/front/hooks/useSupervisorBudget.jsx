import { useState, useEffect } from "react"
import useGlobalReducer from "./useGlobalReducer"
import { budgetValidation, supervisorBudgetFetch } from "../services/apiServicesFetch"


const useSupervisorBudget = () => {
    const { store, dispatch } = useGlobalReducer();
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [editedAmount, setEditedAmount] = useState({});

 useEffect(() => {
  supervisorBudgetFetch(dispatch);
}, [dispatch]);

    return { store, dispatch, selectedEmployeeId, setSelectedEmployeeId, editedAmount, setEditedAmount, budgetValidation}
}

export default useSupervisorBudget