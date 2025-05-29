import { budgetListFetch } from "../services/apiServicesFetch"
import useGlobalReducer from "./useGlobalReducer"
import { useEffect } from "react"
const useEmployeeOpcions = () => {
    const { store, dispatch } = useGlobalReducer()
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
    return {}
}

export default useEmployeeOpcions