import { createContext,useContext,useState,useEffect} from "react";
import { fetchLogin } from "../services/apiServicesFetch";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated,setAuthenticated] = useState(false)

    useEffect(()=>{
        const token = localStorage.getItem("token")
        setAuthenticated(!!token);
    },[])
    
    const login = async (email,password) => {
        try {
            const userData = await fetchLogin(email,password)
            // localStorage.setItem("token", JSON.stringify(userData.token));
            // localStorage.setItem("refreshToken", JSON.stringify(userData.refresh_token));
            setAuthenticated(true);
            return userData;
        } catch (error){
            console.error("Login error:", error.message)
            throw new Error("Login failed");
        }
    };
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        setAuthenticated(false)
    };
    
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);