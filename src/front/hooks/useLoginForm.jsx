import { useState } from "react"
import { useNavigate } from "react-router-dom"

const useLoginForm = ({ initialEmail = "", initialPassword = "" } = {}) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState(initialEmail)
    const [password, setPassword] = useState(initialPassword)

    const rolNavigate = (data) => {
        const isSupervisor = data.user.rol === true || data.user.rol === "true";
        if (!isSupervisor) {
            navigate("/employeehome")
        } else {
            navigate("/")
        }

    }
    return { email, setEmail, password, setPassword, rolNavigate }
}

export default useLoginForm