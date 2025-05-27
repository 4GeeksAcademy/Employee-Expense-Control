import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import BlueSpinner from "./BlueSpinner";

//usamos el prop para dirigir a que ruta queremos ir
const PrivateRoute = ({children, onlyFor}) => {
    const {isAuthenticated, user, loading,isRefreshing} = useAuth();

    if (loading || isRefreshing){
        return <BlueSpinner />
    }
    //si el usuario no inicia sesion no puede entrar a rutas protegidas
    if (!isAuthenticated){
        return <Navigate to="/login"/>;
    }
    if (onlyFor === "supervisor" && !user?.rol){
        return <Navigate to ="/unauthorized"/>;
    }

    if (onlyFor === "employee" && user?.rol){
        return <Navigate to="/unauthorized"/>;
    }

    return children;

}

export default PrivateRoute;