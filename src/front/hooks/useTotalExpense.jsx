import useGlobalReducer from "./useGlobalReducer"
import { billValidation, supervisorBillListFetch, totalExpense } from "../services/apiServicesFetch"
import { useEffect, useState } from "react"


const useTotalExpense = (employeeId = null) => {
    const [openEmployeeIds, setOpenEmployeeIds] = useState([]);
    const { store, dispatch } = useGlobalReducer()
    const { total } = store
    useEffect(() => {
        totalExpense(dispatch, employeeId)

        supervisorBillListFetch(dispatch);

    }, [dispatch, employeeId])

    return { dispatch, store, total,openEmployeeIds,setOpenEmployeeIds, billValidation }
}

export default useTotalExpense