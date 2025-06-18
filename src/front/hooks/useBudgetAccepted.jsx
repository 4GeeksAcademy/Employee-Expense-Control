import useGlobalReducer from "./useGlobalReducer"
import { useState } from "react";
const useBudgetAccepted = () => {
    const { store, dispatch } = useGlobalReducer()
    const [expandedEmployeeId, setExpandedEmployeeId] = useState(null);
    return { store, expandedEmployeeId, setExpandedEmployeeId }
}

export default useBudgetAccepted
