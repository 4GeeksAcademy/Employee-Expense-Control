import useBudgetList from "../hooks/useBudgetList";
import { editBill, deleteBill, deleteBudget } from "../services/apiServicesFetch";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const BudgetListComponent = () => {
    const navigate = useNavigate();
    const {
        budgets,
        dispatch,
        expandedBudgets,
        setExpandedBudgets,
        editingBillId,
        setEditingBillId,
        editedBill,
        setEditedBill
    } = useBudgetList();

    const [modalAction, setModalAction] = useState(null);
    const [modalPayload, setModalPayload] = useState(null);

    const toggleBills = (index) => {
        setExpandedBudgets(prev => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const handleEditClick = (bill) => {
        setEditingBillId(bill.id);
        setEditedBill({
            trip_description: bill.trip_description,
            amount: bill.amount,
            trip_address: bill.trip_address
        });
    };

    if (!Array.isArray(budgets)) {
        return (
            <div className="p-5 text-center text-gray-500 text-lg">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    Loading budgets...
                </motion.div>
            </div>
        );
    }

    return (
        <div className="py-5 px-4" style={{ display: "flex", flexDirection: "column", minHeight: "calc(100vh - 50px)" }}>
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

            <AnimatePresence>
                {budgets.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            justifyContent: "flex-start",
                            flexGrow: 1,
                            textAlign: "right",
                            paddingRight: "60px"
                        }}
                    >
                        <p className="fs-5 m-0" style={{ fontWeight: "bold", color: "#333" }}>
                            No budgets to display.
                        </p>
                    </motion.div>
                )}

                {budgets.map((budget, index) => {
                    const totalBills = budget.bills.reduce((acc, bill) => acc + parseFloat(bill.amount || 0), 0);

                    return (
                        <motion.li
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="list-unstyled mb-4 p-4 bg-white shadow rounded-3 border border-warning-subtle"
                        >
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="fw-bold text-dark m-0">{budget.budget_description}</h5>
                                <div className="d-flex gap-2">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="btn"
                                        onClick={() => toggleBills(index)}
                                        style={{
                                            background: "linear-gradient(135deg, #448F73",
                                        }}
                                    >
                                        {expandedBudgets[index] ? "Hide Bills" : "See Bills"}
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="btn btn-danger"
                                        onClick={() => {
                                            setModalAction("deleteBudget");
                                            setModalPayload({ budgetId: budget.id });
                                        }}
                                    >
                                        Delete
                                    </motion.button>
                                </div>
                            </div>

                            <div className="text-secondary small mb-2">State: {budget.state}</div>
                            <div className="fw-semibold text-amount">Amount: ${parseFloat(budget.amount).toFixed(2)}</div>
                            <div className="fw-semibold text-success">Total Bills: ${totalBills.toFixed(2)}</div>
                            <div className="fw-semibold text-dark">Available: ${(budget.amount - totalBills).toFixed(2)}</div>

                            <AnimatePresence>
                                {expandedBudgets[index] && (
                                    <motion.ul
                                        className="mt-4 ps-0"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {budget.bills.map((bill, billIndex) => (
                                            <li
                                                key={billIndex}
                                                className="mb-3 p-3 border rounded bg-light"
                                            >
                                                {editingBillId === bill.id ? (
                                                    <div className="row g-2">
                                                        <div className="col-md-4">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={editedBill.trip_description}
                                                                onChange={(e) => setEditedBill(prev => ({ ...prev, trip_description: e.target.value }))}
                                                                placeholder="Description"
                                                            />
                                                        </div>
                                                        <div className="col-md-3">
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                value={editedBill.amount}
                                                                onChange={(e) => setEditedBill(prev => ({ ...prev, amount: e.target.value }))}
                                                                placeholder="Amount"
                                                            />
                                                        </div>
                                                        <div className="col-md-5">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={editedBill.trip_address}
                                                                onChange={(e) => setEditedBill(prev => ({ ...prev, trip_address: e.target.value }))}
                                                                placeholder="Address"
                                                            />
                                                        </div>
                                                        <div className="col-12 mt-2 d-flex gap-2">
                                                            <button
                                                                onClick={() => {
                                                                    setModalAction("editBill");
                                                                    setModalPayload({ billId: bill.id });
                                                                }}
                                                                className=" btn-sm confirm-btn"
                                                            >
                                                                Save
                                                            </button>
                                                            <button
                                                                onClick={() => setEditingBillId(null)}
                                                                className=" btn-sm btn-secondary"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="text-muted small">
                                                            <div><strong>Description:</strong> {bill.trip_description}</div>
                                                            <div><strong>Amount:</strong> ${bill.amount}</div>
                                                            <div><strong>State:</strong> {bill.state}</div>
                                                        </div>
                                                        <div className="d-flex gap-2">
                                                            <button
                                                                onClick={() => handleEditClick(bill)}
                                                                className="btn btn-sm"
                                                                style={{
                                                                   background: "linear-gradient(135deg,rgb(224, 160, 10), #9E7515)",
                                                                }}
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setModalAction("deleteBill");
                                                                    setModalPayload({ billId: bill.id, budgetId: bill.budget_id });
                                                                }}
                                                                className="btn btn-sm btn-danger"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                        </motion.li>
                    );
                })}
            </AnimatePresence>

            <AnimatePresence>
                {modalAction && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100vw",
                            height: "100vh",
                            backgroundColor: "rgba(0,0,0,0.4)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            zIndex: 9999,
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                background: "white",
                                borderRadius: "12px",
                                padding: "2rem",
                                maxWidth: "400px",
                                width: "100%",
                                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                            }}
                        >
                            <h3 className="mb-3">Confirm Action</h3>
                            <p className="mb-4">
                                {modalAction === "deleteBill"
                                    ? "Are you sure you want to delete this bill?"
                                    : modalAction === "deleteBudget"
                                        ? "Are you sure you want to delete this budget?"
                                        : "Are you sure you want to save these changes?"}
                            </p>
                            <div className="d-flex justify-content-end gap-2">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        setModalAction(null);
                                        setModalPayload(null);
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-success confirm-btn"
                                    onClick={async () => {
                                        if (modalAction === "deleteBill") {
                                            await deleteBill(modalPayload.billId, modalPayload.budgetId, dispatch);
                                        } else if (modalAction === "deleteBudget") {
                                            await deleteBudget(modalPayload.budgetId, dispatch);
                                        } else if (modalAction === "editBill") {
                                            await editBill(modalPayload.billId, editedBill, dispatch);
                                        }
                                        setModalAction(null);
                                        setModalPayload(null);
                                        setEditingBillId(null);
                                    }}
                                >
                                    Confirm
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BudgetListComponent;