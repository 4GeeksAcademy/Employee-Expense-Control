import useGlobalReducer from "./useGlobalReducer"
import { totalExpenseDepartment } from "../services/apiServicesFetch"
import { useEffect } from "react"
const useTotalExpenseDepartment = () => {
    const { store, dispatch } = useGlobalReducer()
    const { total } = store
    useEffect(() => {
        totalExpenseDepartment(dispatch)
    }, [dispatch])
    return { total }
}

export default useTotalExpenseDepartment