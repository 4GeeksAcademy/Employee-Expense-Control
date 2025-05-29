import { useState, useEffect } from "react"
import { supervisorBudgetFetch } from "../services/apiServicesFetch"
import useGlobalReducer from "./useGlobalReducer"
import { acceptBudget,rejectBudget } from "../services/apiServicesFetch"

const useSupervisorBudget = () => {
    const { store, dispatch } = useGlobalReducer();
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [editedAmount, setEditedAmount] = useState({});

    useEffect(() => {
        supervisorBudgetFetch(dispatch);
    }, [dispatch]);

    return { store, dispatch, selectedEmployeeId, setSelectedEmployeeId, editedAmount, setEditedAmount,acceptBudget,rejectBudget }
}

export default useSupervisorBudget