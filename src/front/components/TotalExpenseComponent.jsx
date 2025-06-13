import React, { useState, useEffect } from "react";
import useTotalExpense from "../hooks/useTotalExpense";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLinkButton = motion(Link);

const TotalExpenseComponent = ({ employeeId }) => {
  const [pendingAction, setPendingAction] = useState(null);
  const [pendingBillId, setPendingBillId] = useState(null);
  const [pendingAmount, setPendingAmount] = useState(null);

  const { dispatch, store, total, openEmployeeIds, setOpenEmployeeIds, billValidation, totalExpense } = useTotalExpense(employeeId);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } },
  };

  const billItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const styles = {
    backButtonWrapper: {
      marginTop: "40px",
      marginBottom: "20px",
      display: "flex",
      justifyContent: "center",
      width: "100%",
    },
    backButton: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "12px 24px",
      background: "linear-gradient(to right, #10b981, #059669)",
      color: "white",
      fontWeight: "600",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      textDecoration: "none",
      border: "none",
      cursor: "pointer",
    },
  };

  const backButtonVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 10, delay: 0.5 } },
    hover: {
      scale: 1.05,
      boxShadow: "0 8px 12px rgba(16, 185, 129, 0.4)",
      transition: { duration: 0.2, ease: "easeOut" }
    },
    tap: { scale: 0.95, transition: { duration: 0.1, ease: "easeIn" } }
  };

  if (!total || Object.keys(total).length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <p className="text-muted fs-5">Loading information or no data available...</p>
      </div>
    );
  }

  const handleAccept = async (billId) => {
    await billValidation(dispatch, billId, "approved");
    console.log("Accepting", billId);
  };

  const handleReject = async (billId) => {
    await billValidation(dispatch, billId, "denegated");
    console.log("Rejecting", billId);
  };

  const handleModalConfirm = async () => {
    if (pendingAction === "approved") {
      await handleAccept(pendingBillId);
      await totalExpense(dispatch, employeeId);
    } else if (pendingAction === "denegated") {
      await handleReject(pendingBillId);
    }

    const modal = window.bootstrap.Modal.getInstance(
      document.getElementById("exampleModal")
    );
    if (modal) modal.hide();

    setPendingAction(null);
    setPendingBillId(null);
    setPendingAmount(null);
  };

  const toggleEmployee = (id) => {
    setOpenEmployeeIds((prev) =>
      prev.includes(id) ? prev.filter((empId) => empId !== id) : [...prev, id]
    );
  };

  return (
    <>
      <motion.div
        className="p-4 mx-auto my-4 bg-white rounded shadow-lg"
        style={{ maxWidth: '700px' }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 variants={itemVariants} className="text-center mb-4 text-black">
          Departmental Expenses
        </motion.h2>

        <motion.div
          className="bg-light border border-success rounded p-4 shadow-sm mb-4"
          variants={itemVariants}
        >
          <p className="fs-5 fw-semibold text-success">
            Department: <span className="text-dark fw-bold">{total.department.name}</span>
          </p>
          <p className="fs-4 fw-bold mt-2 text-success">
            General Expense Summary:{" "}
            <span className="text-dark">${
              typeof total.department.total_expenses === 'number'
                ? total.department.total_expenses.toFixed(2)
                : '0.00'
            }</span>
          </p>
        </motion.div>

        <hr className="my-4 border-success" />

        <motion.h3 variants={itemVariants} className="text-center mb-3 text-black">
          Expenses by Employee
        </motion.h3>

        <motion.div className="d-grid gap-3" variants={containerVariants}>
          {total.employees.map((emp) => (
            <motion.div
              key={emp.employee_id}
              className="card shadow-sm overflow-hidden border-success"
              variants={cardVariants}
              whileHover={{ scale: 1.02, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <button
                onClick={() => toggleEmployee(emp.employee_id)}
                className="btn btn-light w-100 text-start py-3 fw-bold text-dark d-flex justify-content-between align-items-center"
              >
                <span>{emp.name} (ID: {emp.employee_id})</span>
                <motion.span
                  animate={{ rotate: openEmployeeIds.includes(emp.employee_id) ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-success fs-5"
                >
                  ▶
                </motion.span>
              </button>

              {openEmployeeIds.includes(emp.employee_id) && (
                <motion.div
                  className="p-4 bg-light border-top border-success"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <p className="fw-semibold text-success mb-3">
                    Total Expenses:{" "}
                    <span className="text-dark fw-bold">${
                      typeof emp.total_expenses === 'number'
                        ? emp.total_expenses.toFixed(2)
                        : '0.00'
                    }</span>
                  </p>
                  <div className="mt-3 pt-3 border-top border-success">
                    <h4 className="fs-5 fw-bold mb-3 text-success">Pending Bills:</h4>
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="d-grid gap-2">
                      {emp.budgets
                        .flatMap((budget) =>
                          budget.bills
                            .map(
                              (bill) =>
                                store.bills.find((bil) => bil.id === bill.id) || bill
                            )
                            .filter((bill) => bill && bill.state === "PENDING")
                        )
                        .map((bill, index) => (
                          <motion.div
                            key={bill.id}
                            className="d-flex justify-content-between align-items-center bg-white p-3 border rounded shadow-sm"
                            variants={billItemVariants}
                            custom={index}
                          >
                            <div>
                              <p className="fw-medium text-dark">{bill.trip_description}</p>
                              <p className="text-muted mt-1">Amount: <span className="fw-semibold">${bill.amount}</span></p>
                            </div>
                            <div className="d-grid gap-2 d-md-flex">
                              <button
                                className="btn btn-sm btn-success"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() => {
                                  setPendingAction("approved");
                                  setPendingBillId(bill.id);
                                  setPendingAmount(bill.amount);
                                }}
                              >
                                Accept
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() => {
                                  setPendingAction("denegated");
                                  setPendingBillId(bill.id);
                                }}
                              >
                                Reject
                              </button>
                            </div>
                          </motion.div>
                        ))}
                    </motion.div>
                    {emp.budgets.flatMap((budget) =>
                      budget.bills
                        .map((bill) => store.bills.find((bil) => bil.id === bill.id) || bill)
                        .filter((bill) => bill && bill.state === "PENDING")
                    ).length === 0 && (
                        <p className="text-muted fst-italic mt-3 fs-6">No pending bills for this employee.</p>
                      )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          style={styles.backButtonWrapper}
          variants={backButtonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
        >
          <MotionLinkButton
            to="/supervisor"
            style={styles.backButton}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" style={{ marginRight: '8px' }} viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5" />
            </svg>
            <span>Back to Home</span>
          </MotionLinkButton>
        </motion.div>

      </motion.div>

      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Confirm Bill Action</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {pendingAction === "approved"
                ? `Are you sure you want to accept this bill for €${pendingAmount}?`
                : "Are you sure you want to reject this bill?"}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" onClick={handleModalConfirm}>Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalExpenseComponent;