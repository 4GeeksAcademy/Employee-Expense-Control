import { useState, useEffect } from "react"
import { budgetListFetch } from "../services/apiServicesFetch"
const useBudgetList = () => {
    const [budgetList, setBudgetList] = useState(null)

    useEffect(() => {
        const getBudgetList = async () => {
            const data = await budgetListFetch()
            if (data && data.budget_list) {
                setBudgetList(data)
            }
            try {

            } catch (error) {
                console.error(error)
            }
        }
        getBudgetList()
    }, [])
    return {}
}

export default useBudgetList