import { supervisorBudgetFetch } from "../services/apiServicesFetch"
import useGlobalReducer from "./useGlobalReducer"
import { useEffect } from "react";
const useSupervisorOpcions = () => {

    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        supervisorBudgetFetch(dispatch);
    }, [dispatch]);

    return {}
}

export default useSupervisorOpcions