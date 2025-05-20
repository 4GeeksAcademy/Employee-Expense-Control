import { useEffect } from "react"
import useGlobalReducer from "./useGlobalReducer"
import { budgetListFetch } from "../services/apiServicesFetch"
const useBudgetList = () => {
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
    return { budgets: store.budgets }
}

export default useBudgetList