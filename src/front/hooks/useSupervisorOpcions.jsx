import { supervisorBudgetFetch } from "../services/apiServicesFetch"
import useGlobalReducer from "./useGlobalReducer"
import { useEffect } from "react";
const useSupervisorOpcions = () => {

    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        supervisorBudgetFetch(dispatch);
    }, [dispatch]);

    return {store}
}

export default useSupervisorOpcions