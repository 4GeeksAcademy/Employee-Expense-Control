import { useEffect, useState } from "react"
import useGlobalReducer from "./useGlobalReducer"
import { budgetListFetch } from "../services/apiServicesFetch"
const useBudgetList = () => {
    const { store, dispatch } = useGlobalReducer()
    const [expandedBudgets, setExpandedBudgets] = useState({});
    const [editingBillId, setEditingBillId] = useState(null);
    const [editedBill, setEditedBill] = useState({
        trip_description: "",
        amount: "",
        trip_address: ""
    });


    useEffect(() => {
        const fetchBudgets = async () => {
            try {
                await budgetListFetch(dispatch)
            } catch (error) {
                console.error(error)
            }
        }
        fetchBudgets()
    }, [dispatch])
    return { budgets: store.budgets || [], dispatch, expandedBudgets, setExpandedBudgets, editingBillId, setEditingBillId, editedBill, setEditedBill }
}

export default useBudgetList