import useGlobalReducer from "./useGlobalReducer"
import { totalExpenseDepartment } from "../services/apiServicesFetch"
import { useEffect, useState } from "react"
const useTotalExpenseDepartment = () => {
    const [openEmployeeIds, setOpenEmployeeIds] = useState([]);
    const { store, dispatch } = useGlobalReducer()
    const { total } = store
    useEffect(() => {
        totalExpenseDepartment(dispatch)
    }, [dispatch])
    return { total,openEmployeeIds,setOpenEmployeeIds }
}

export default useTotalExpenseDepartment