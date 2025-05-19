import useBudgetForm from "../hooks/useBudgetForm"
import { budgetFetch } from "../services/apiServicesFetch"
const BudgetForm = () => {
    const { navigate, description, setDescription } = useBudgetForm()
    const handleSubmit = (e) => {
        e.preventDefault()
        budgetFetch(description)
        navigate("/budgetlist")
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
                <button
                    type="submit"
                    className="btn btn-primary w-100"
                    style={{ fontSize: "1.2rem", padding: "0.75rem" }}
                >
                    Submit
                </button>
            </form>
        </div>


    </>)

}

export default BudgetForm