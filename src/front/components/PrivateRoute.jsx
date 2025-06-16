import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import BlueSpinner from "./BlueSpinner";

const PrivateRoute = ({ children, onlyFor }) => {
    const { isAuthenticated, user, loading, isRefreshing } = useAuth();

    console.log('--- PrivateRoute Debug ---');
    console.log('isAuthenticated:', isAuthenticated);
    console.log('user:', user);
    console.log('user.rol:', user?.rol);
    console.log('typeof user.rol:', typeof user?.rol);
    console.log('onlyFor:', onlyFor);
    console.log('Should redirect supervisor?', onlyFor === "supervisor" && !user?.rol);
    console.log('Should redirect employee?', onlyFor === "employee" && user?.rol);

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
