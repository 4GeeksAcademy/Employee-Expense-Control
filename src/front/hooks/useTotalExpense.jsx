import useGlobalReducer from "./useGlobalReducer"
import { totalExpense } from "../services/apiServicesFetch"
import { useEffect, useState } from "react"
const useTotalExpense = (employeeId = null) => {
    const [openEmployeeIds, setOpenEmployeeIds] = useState([]);
    const { store, dispatch } = useGlobalReducer()
    const { total } = store
    useEffect(() => {
        totalExpense(dispatch, employeeId)
    }, [dispatch, employeeId])
    return { total,openEmployeeIds,setOpenEmployeeIds }
}

export default useTotalExpense