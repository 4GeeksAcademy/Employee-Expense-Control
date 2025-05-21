import { useNavigate } from "react-router-dom"
import { useState } from "react"
const useBudgetForm = () => {
    const navigate = useNavigate()
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState("");

    return { navigate, description, setDescription,amount,setAmount }
}

export default useBudgetForm