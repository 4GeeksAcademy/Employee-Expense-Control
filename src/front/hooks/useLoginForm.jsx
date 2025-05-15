import { useState } from "react"
const useLoginForm = ({ initialEmail = "", initialPassword = "" } = {}) => {
    const [email, setEmail] = useState(initialEmail)
    const [password, setPassword] = useState(initialPassword)
    return { email, setEmail, password, setPassword }
}

export default useLoginForm