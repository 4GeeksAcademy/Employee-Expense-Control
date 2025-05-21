import { useNavigate } from "react-router-dom"
import { useState } from "react"
const useBudgetForm = () => {
    const navigate = useNavigate()
    const [description, setDescription] = useState("")

    return { navigate, description, setDescription }
}

export default useBudgetForm