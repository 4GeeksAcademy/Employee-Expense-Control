import { useState, useEffect } from "react";
import { fetchId } from "../services/apiServicesFetch";
import useGlobalReducer from "../hooks/useGlobalReducer";
import BlueSpinner from "../components/BlueSpinner";

const IdEmployeeComponent = () => {
const {store,dispatch} = useGlobalReducer();

useEffect(() =>{
    const loadId = async () => { 
        if (!store.employeeId){
            try {
                const data = await fetchId();
                if (data?.id){
                    dispatch({type: "set_employee_id", payload: data.id})
                }
            } catch (error){
                console.error("Error loading employee ID", error);
            }
        }
    };
    loadId();
}, [store.employeeId, dispatch]);

if (!store.employeeId){
    return  <BlueSpinner />;
}

    return (
        <h1>
            Your ID <strong>{store.employeeId}</strong> is to give it to your superior so that he can start using the app.
        </h1>
    );
};

export default IdEmployeeComponent;
