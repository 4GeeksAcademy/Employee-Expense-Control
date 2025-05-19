import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";
const useBillForm = ({ initialDescription = "", initialLocation = "", initialAmount = "", initialImage = null } = {}) => {
    const [description, setDescription] = useState(initialDescription);
    const [location, setLocation] = useState(initialLocation)
    const [amount, setAmount] = useState(initialAmount)
    const [image, setImage] = useState(initialImage)
    const navigate = useNavigate()
    return { description, setDescription, location, setLocation, amount, setAmount, image, setImage, navigate }
}

export default useBillForm