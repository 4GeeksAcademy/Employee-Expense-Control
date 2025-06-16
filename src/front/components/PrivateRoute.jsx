import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import BlueSpinner from "./BlueSpinner";

const PrivateRoute = ({ children, onlyFor }) => {
    const { isAuthenticated, user, loading, isRefreshing } = useAuth();


    if (loading || isRefreshing) {
        return <BlueSpinner />;
    }
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    if (onlyFor === "supervisor" && !user?.rol) {
        return <Navigate to="/unauthorized" />;
    }
    if (onlyFor === "employee" && user?.rol) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default PrivateRoute;
