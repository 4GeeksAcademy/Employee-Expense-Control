import useBudgetForm from "../hooks/useBudgetForm";
import { budgetFetch } from "../services/apiServicesFetch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import BudgetTitlePanel from "/workspaces/Employee-Expense-Control/src/front/DesignComponents/PendingHome/BudgetTitlePanel.jsx";
import "/workspaces/Employee-Expense-Control/src/front/DesignComponents/EmployeeHome/EmployeePanel.css"

const BudgetForm = () => {
    const { navigate: formNavigate, description, setDescription, amount, setAmount } = useBudgetForm();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!description.trim() || !amount) {
            setError(true);
            setShowMessage(true); // show alert
            setMessage("All fields are required.");
            setTimeout(() => setShowMessage(false), 5000); // hide alert
            return;
        }

        if (parseFloat(amount) <= 0) {
            setError(true);
            setMessage("Amount must be greater than 0.");
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 5000);

            return;
        }

        try {
            const res = await budgetFetch(description, amount);

            if (res.ok === false || res.error) {
                setError(true);
                setMessage(res.message || "Error creating budget.");
                return;
            }

            setError(false);
            setMessage("Budget created successfully!");
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 5000);


            setTimeout(() => {
                formNavigate("/mybudgets");
            }, 1000);
        } catch (err) {
            console.error(err);
            setError(true);
            setMessage("Unexpected error while submitting budget.");
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 5000);

        }
    };

    return (
        <div className="container py-5 no-top-space">
            <BudgetTitlePanel
                title="Create New Budget 💰"
                description="Fill in the details below to start a new budget record."
                style={{
                    background: "linear-gradient(135deg,#9E7515, #059669)",

                }}
            />

            <div className="d-flex justify-content-center align-items-center flex-column">
                {/* Back Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/employeehome")}
                    className="btn mb-4 align-self-start go-back-btn"
                    style={{
                        borderRadius: "2rem",
                        fontWeight: "600",
                        padding: "0.75rem 1.5rem",
                        border: "2px groove grey",
                        background: "var(--ghost-green)",
                        color: "var(--ghost-white)",
                    }}
                >
                    ⬅ Back to Dashboard
                </motion.button>

                {/* Form Card */}
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "20px",
                        padding: "2rem",
                        boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
                        width: "100%",
                        maxWidth: "600px",
                        border: "1px solid #9E7515"
                    }}
                >
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mb-4 text-center"
                        style={{
                            fontSize: "2rem",
                            fontWeight: "700",
                            background: "linear-gradient(90deg, #9E7515, #059669)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            letterSpacing: "0.5px",
                            textShadow: "1px 1px 2px rgba(0,0,0,0.05)",
                        }}
                    >
                        🚀 Start a New Budget
                    </motion.h2>



                    <AnimatePresence>
                        {showMessage && (
                            <motion.div
                                key="alert"
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.7, ease: "easeInOut" }}
                                className={`alert ${error ? "alert-danger" : "alert-success"}`}
                                style={{
                                    borderRadius: "12px",
                                    fontSize: "1rem",
                                    fontWeight: "500",
                                    marginBottom: "1rem",
                                }}
                                role="alert"
                            >
                                {message}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="description"
                                className="form-label"
                                style={{
                                    fontSize: "1.05rem",
                                    fontWeight: "500",
                                    color: "#9E7515", // Slate-like modern tone
                                    letterSpacing: "0.3px",
                                    marginBottom: "0.4rem",
                                    display: "block",
                                }}
                            >
                                Budget Description
                            </label>

                            <input
                                type="text"
                                id="description"
                                className="form-control shadow-sm border-0 custom-holder"
                                placeholder="Enter a description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                style={{
                                    fontSize: "1.1rem",
                                    padding: "0.75rem",
                                    borderRadius: "12px",
                                    backgroundColor: "#f1f5f9",
                                }}
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="description"
                                className="form-label"
                                style={{
                                    fontSize: "1.05rem",
                                    fontWeight: "500",
                                    color: "#9E7515", // Slate-like modern tone
                                    letterSpacing: "0.3px",
                                    marginBottom: "0.4rem",
                                    display: "block",
                                }}
                            >
                                Amount
                            </label>

                            <input
                                type="number"
                                id="amount"
                                className="form-control shadow-sm border-0 custom-holder"
                                placeholder="Enter amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                style={{
                                    fontSize: "1.1rem",
                                    padding: "0.75rem",
                                    borderRadius: "12px",
                                    backgroundColor: "#f1f5f9",
                                }}
                                min="0"
                                step="0.01"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn w-100 mb-2"
                            style={{
                                background: "linear-gradient(to right, #404040, #9E7515)",
                                color: "#fff",
                                fontSize: "1.2rem",
                                padding: "0.75rem",
                                borderRadius: "12px",
                                boxShadow: "0 4px 10px rgba(158, 117, 21, 0.3)",
                                fontWeight: "600",
                                border: "none",
                            }}
                        >
                            Submit Budget
                        </button>

                    </form>
                </motion.div>
            </div>
        </div >
    );
};

export default BudgetForm;
