import React, { useState } from "react";
import useTotalExpense from "../hooks/useTotalExpense";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const MotionLinkButton = motion(Link);

const TotalExpenseComponent = ({ employeeId }) => {
  const [pendingAction, setPendingAction] = useState(null);
  const [pendingBillId, setPendingBillId] = useState(null);
  const [pendingAmount, setPendingAmount] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const {
    dispatch,
    store,
    total,
    openEmployeeIds,
    setOpenEmployeeIds,
    billValidation,
    totalExpense,
  } = useTotalExpense(employeeId);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const styles = {
    backButtonWrapper: {
      marginTop: "40px",
      marginBottom: "20px",
      display: "flex",
      justifyContent: "center",
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
      overflow: "hidden",
    },
    mainTitleStyle: {
      fontSize: "2.25rem",
      fontWeight: "800",
      color: "#1a202c",
      letterSpacing: "-0.025em",
    },
    subTitleStyle: {
      fontSize: "1.75rem",
      fontWeight: "800",
      color: "#1a202c",
      letterSpacing: "-0.025em",
    },
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
    await totalExpense(dispatch, employeeId);
  };

  const handleReject = async (billId) => {
    await billValidation(dispatch, billId, "denegated");
  };

  const handleModalConfirm = async () => {
    if (pendingAction === "approved") {
      await handleAccept(pendingBillId);
    } else if (pendingAction === "denegated") {
      await handleReject(pendingBillId);
    }

    setShowModal(false);
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
        style={{ maxWidth: "700px" }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          variants={itemVariants}
          className="text-center mb-4"
          style={styles.mainTitleStyle}
        >
          Departmental Expenses
        </motion.h2>

        <motion.div
          className="bg-light border border-success rounded p-4 shadow-sm mb-4"
          variants={itemVariants}
        >
          <p className="fs-5 fw-semibold text-success">
            Department:{" "}
            <span className="text-dark fw-bold">{total.department.name}</span>
          </p>
          <p className="fs-4 fw-bold mt-2 text-success">
            General Expense Summary:{" "}
            <span className="text-dark">
              {typeof total.department.total_expenses === "number"
                ? total.department.total_expenses.toFixed(2)
                : "0.00"}
            </span>
          </p>
        </motion.div>

        <hr className="my-4 border-success" />

        <motion.h3
          variants={itemVariants}
          className="text-center mb-3"
          style={styles.subTitleStyle}
        >
          Expenses by Employee
        </motion.h3>

        <motion.div className="d-grid gap-3" variants={containerVariants}>
          {total.employees.map((emp) => (
            <motion.div
              key={emp.employee_id}
              className="card shadow-sm overflow-hidden border-success"
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <button
                onClick={() => toggleEmployee(emp.employee_id)}
                className="btn btn-light w-100 text-start py-3 fw-bold text-dark d-flex justify-content-between align-items-center"
              >
                <span>
                  {emp.name} (ID: {emp.employee_id})
                </span>
                <motion.span
                  animate={{
                    rotate: openEmployeeIds.includes(emp.employee_id) ? 90 : 0,
                  }}
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
                    <span className="text-dark fw-bold">
                      {typeof emp.total_expenses === "number"
                        ? emp.total_expenses.toFixed(2)
                        : "0.00"}
                    </span>
                  </p>
                  <div className="mt-3 pt-3 border-top border-success">
                    <h4 className="fs-5 fw-bold mb-3 text-success">Pending Bills:</h4>
                    {emp.budgets
                      .flatMap((budget) =>
                        budget.bills
                          .map(
                            (bill) =>
                              store.bills.find((b) => b.id === bill.id) || bill
                          )
                          .filter((bill) => bill && bill.state === "PENDING")
                      )
                      .map((bill) => (
                        <motion.div
                          key={bill.id}
                          className="d-flex justify-content-between align-items-center bg-white p-3 border rounded shadow-sm mb-2"
                        >
                          <div>
                            <p className="fw-medium text-dark">
                              {bill.trip_description}
                            </p>
                            <p className="text-muted mt-1">
                              Amount: <span className="fw-semibold">${bill.amount}</span>
                            </p>
                          </div>
                          <div className="d-grid gap-2 d-md-flex">
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() => {
                                setPendingAction("approved");
                                setPendingBillId(bill.id);
                                setPendingAmount(bill.amount);
                                setShowModal(true);
                              }}
                            >
                              Accept
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => {
                                setPendingAction("denegated");
                                setPendingBillId(bill.id);
                                setShowModal(true);
                              }}
                            >
                              Reject
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    {emp.budgets
                      .flatMap((budget) =>
                        budget.bills
                          .map(
                            (bill) =>
                              store.bills.find((b) => b.id === bill.id) || bill
                          )
                          .filter((bill) => bill && bill.state === "PENDING")
                      ).length === 0 && (
                        <p className="text-muted fst-italic mt-3 fs-6">
                          No pending bills for this employee.
                        </p>
                      )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          style={styles.backButtonWrapper}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <MotionLinkButton to="/supervisor" style={styles.backButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              style={{ marginRight: "8px" }}
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
              />
            </svg>
            <span>Back to Home</span>
          </MotionLinkButton>
        </motion.div>
      </motion.div>

      {/* MODAL ANIMADO */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal-backdrop"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1050,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded p-4 shadow-lg"
              style={{ width: "90%", maxWidth: "400px" }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h5 className="mb-3 fw-bold text-dark">
                {pendingAction === "approved"
                  ? "Confirm Bill Acceptance"
                  : "Confirm Bill Rejection"}
              </h5>
              <p className="text-muted">
                {pendingAction === "approved"
                  ? `Are you sure you want to accept this bill for €${pendingAmount}?`
                  : "Are you sure you want to reject this bill?"}
              </p>
              <div className="d-flex justify-content-end mt-4 gap-2">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleModalConfirm}
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TotalExpenseComponent;
