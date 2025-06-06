
import useBudgetForm from "../hooks/useBudgetForm"
import { budgetFetch } from "../services/apiServicesFetch"
import { useState } from "react"
const BudgetForm = () => {
    const { navigate, description, setDescription, amount, setAmount } = useBudgetForm()

    // AGREGADO UN ESTADO PARA MENSAJES
    const [message, setMessage] = useState("")
    const [error, setError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!description.trim() || !amount) {
            setError(true)
            setMessage("Todos los campos son obligatorios.")
            return
        }

        if (parseFloat(amount) <= 0) {
            setError(true)
            setMessage("El monto debe ser mayor que 0.")
            return
        }
//CORREGIDO AÑADIDO UN ESTADO DE ESPERA DE PARTE DEL FETCH CON LOS SIGUIENTES VALORES PARA PODER REDIRECCIONAR
//ANTES NO TOMABA LOS DATOS DEL FETCH Y SIMPLEMETE "El usuario era redirigido incluso si el presupuesto fallaba en el backend."
//Nunca sabías si el presupuesto se había creado con éxito.
//Si el backend se demoraba, se redirigía antes de que terminara la solicitud.

        try {
            const res = await budgetFetch(description, amount)

            if (res.ok === false || res.error) {
                setError(true)
                setMessage(res.message || "Error al crear presupuesto.")
                return
            }

        
            setError(false)
            setMessage("Presupuesto creado correctamente.")

            
            setTimeout(() => {
                navigate("/mybudgets")
            }, 1000)

        } catch (err) {
            console.error(err)
            setError(true)
            setMessage("Error inesperado al enviar el presupuesto.")
        }
    }

    return (<>
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f8f9fa",
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    width: "100%",
                    maxWidth: "600px",
                    background: "white",
                    padding: "3rem",
                    borderRadius: "1.5rem",
                    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
                    fontSize: "1.25rem",
                }}
            >
                <h2 className="mb-4 text-center">Add Budget</h2>

                 {message && (
                    <div
                        className={`alert ${error ? "alert-danger" : "alert-success"}`}
                        role="alert"
                    >
                        {message}
                    </div>
                )}
                {/* Input de descripción */}
                <div className="mb-4">
                    <label htmlFor="description" className="form-label">
                        Budget Description
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        placeholder="Enter a description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ fontSize: "1.1rem", padding: "0.75rem" }}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="amount" className="form-label">
                        Amount
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="amount"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        style={{ fontSize: "1.1rem", padding: "0.75rem" }}
                        min="0"
                        step="0.01"
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-100"
                    style={{ fontSize: "1.2rem", padding: "0.75rem" }}
                >
                    Submit
                </button>
            </form>
        </div>
    </>
    )

}

export default BudgetForm