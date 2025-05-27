import { createContext,useContext,useState,useEffect} from "react";
import { fetchLogin } from "../services/apiServicesFetch";
import { fetchUserProfile } from "../services/apiServicesFetch";
import { authFetch } from "../services/apiInterceptor";

const AuthContext = createContext(); //Creamos el contexto de autenticacion para usuarios


export const AuthProvider = ({children}) => {
    const [isAuthenticated,setAuthenticated] = useState(false); //Verificamos si esta autenticado
    const [user, setUser]= useState(null) //Buscamos los datos de usuario al iniciar sesion
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    
    const loadUser = async () => {
    try {
      const response = await authFetch("/me", {}, {
        onRefreshStart: () => setIsRefreshing(true),
        onRefreshEnd: () => setIsRefreshing(false),
        onLogout: logout,
      });

      const userData = await response.json();
      setUser(userData);
      setAuthenticated(true);
    } catch (error) {
      console.error("Error loading user profile:", error);
      setAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);
    const login = async (email,password) => {
        try {
            setLoading(true);
            const userData = await fetchLogin(email,password)//Guardamos con el email y password
            await new Promise(resolve => setTimeout(resolve, 100));
            
            await loadUser()
            
            return userData;
        } catch (error){
            console.error("Login error:", error.message)
            throw new Error("Login failed");
        } finally {
            setLoading(false)
        }
    };
    
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        setAuthenticated(false)
        setUser(null);
    };
    
    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout,loading,isRefreshing }}>
      {children}
    </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);