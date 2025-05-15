import { useState } from "react"
const useBillForm = ({ initialDescription = "", initialLocation = "", initialAmount = "", initialImage = null } = {}) => {
    const [description, setDescription] = useState(initialDescription);
    const [location, setLocation] = useState(initialLocation)
    const [amount, setAmount] = useState(initialAmount)
    const [image, setImage] = useState(initialImage)
    return { description, setDescription, location, setLocation, amount, setAmount, image, setImage }
}

export default useBillForm