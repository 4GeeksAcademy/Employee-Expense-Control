import { useState } from "react"
import { useNavigate } from "react-router-dom"

const useLoginForm = ({ initialEmail = "", initialPassword = "" } = {}) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState(initialEmail)
    const [password, setPassword] = useState(initialPassword)

    const rolNavigate = (userData) => {
        console.log("Datos recibidos en rolNavigate:", userData);
        if (!userData.rol === undefined) { // Verifica si existe el rol
            console.error("Rol no definido en userData");
            return;
        }
        const isSupervisor = Boolean(userData.rol === true || userData.rol === "true");
        if (!isSupervisor) {
            navigate("/employeehome")
        } else {
            navigate("/")
        }

    }
    return { email, setEmail, password, setPassword, rolNavigate }
}

export default useLoginForm