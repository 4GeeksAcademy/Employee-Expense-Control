import React, { useState, useEffect } from "react"
import useTotalExpense from "../hooks/useTotalExpense";


const TotalExpenseComponent = ({ employeeId }) => {


  const [pendingAction, setPendingAction] = useState(null); // 'accept' or 'reject'
  const [pendingBillId, setPendingBillId] = useState(null);
  const [pendingAmount, setPendingAmount] = useState(null);

  const { dispatch, store, total, openEmployeeIds, setOpenEmployeeIds, billValidation } = useTotalExpense(employeeId)

  console.log(store)

  if (!total || Object.keys(total).length === 0) {
    return <p className="text-gray-500">No hay información disponible.</p>;
  }

  const handleAccept = async (billId) => {
    await billValidation(dispatch, billId, "approved")
    console.log("Aceptar", billId);
  };

  const handleReject = async (billId) => {
    await billValidation(dispatch, billId, "denegated")
    console.log("Rechazar", billId);
  };

  const handleModalConfirm = async () => {
    if (pendingAction === "approved") {
      await handleAccept(pendingBillId);
    } else if (pendingAction === "denegated") {
      await handleReject(pendingBillId);
    }

    // Close the Bootstrap modal
    const modal = window.bootstrap.Modal.getInstance(
      document.getElementById("exampleModal")
    );
    if (modal) modal.hide();

    // Reset modal state
    setPendingAction(null);
    setPendingBillId(null);
    setPendingAmount(null);
  };

  // const pendingBills = store.bills.filter((bill) => bill.state === "PENDING");

  store.bills.forEach(bill => console.log(`Bill ${bill.id} state:`, bill.state));
  // store.bills.forEach(bill => console.log(`Bill ${bill.id} employee_id:`, bill.employee_id));
  console.log("Bills from store:", store.bills);

  // const filteredBills = openEmployeeIds
  //     ? pendingBills.filter((bill) => bill.employee_id === openEmployeeIds)
  //     : pendingBills;

  const toggleEmployee = (id) => {
    setOpenEmployeeIds((prev) =>
      prev.includes(id)
        ? prev.filter((empId) => empId !== id)
        : [...prev, id]
    );
  };

  return (
    <>
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Gastos del Departamento
        </h2>

        <div className="bg-white border border-gray-300 rounded-lg p-4 shadow mb-6">
          <p className="text-lg font-semibold">
            Departamento:{" "}
            <span className="text-blue-600">{total.department.name}</span>
          </p>
          <p className="text-lg font-semibold mt-2">
            Total General de Gastos:{" "}
            <span className="text-green-600">
              ${total.department.total_expenses.toFixed(2)}
            </span>
          </p>
        </div>

        <hr className="my-6 border-gray-300" />

        <h3 className="text-xl font-semibold mb-3 text-center">
          Gastos por Empleado
        </h3>

        <div className="space-y-4">
          {total.employees.map((emp) => (
            <div
              key={emp.employee_id}
              className="bg-gray-50 border border-gray-200 rounded-md shadow-sm"
            >
              <button
                onClick={() => toggleEmployee(emp.employee_id)}
                className="w-full text-left p-4 font-semibold text-gray-800 hover:bg-gray-100 focus:outline-none"
              >
                {emp.name} (ID: {emp.employee_id})
              </button>

              {openEmployeeIds.includes(emp.employee_id) && (
                <div className="px-4 pb-4">
                  <p>
                    <strong>Total de Gastos:</strong>{" "}
                    <span className="text-green-700">
                      ${emp.total_expenses.toFixed(2)}
                    </span>
                  </p>

                {/* Write a comment tomorrow */}

                  {emp.budgets
                    .flatMap((budget) =>
                      budget.bills
                        .map((bill) =>
                          store.bills.find((b) => b.id === bill.id) || bill // get updated bill if available
                        )
                        .filter((bill) => bill.state === "PENDING")
                    )
                    .map((bill) => (
                      <div
                        key={bill.id}
                        className="mt-2 flex justify-between items-center bg-white p-3 border rounded"
                      >
                        <div>
                          <p className="text-sm font-medium">
                            {bill.trip_description}
                          </p>
                          <p className="text-sm text-gray-600">
                            Monto: €{bill.amount}
                          </p>
                        </div>
                        <div className="space-x-2">
                          <button
                            className="btn btn-sm btn-success"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() => {
                              setPendingAction("approved");
                              setPendingBillId(bill.id);
                              setPendingAmount(bill.amount)
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
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Reusable modal used for accept/reject confirmation */}
      {/* Modal */}
      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Confirm Bill Action</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {pendingAction === "approved"
                ? `Are you sure you want to accept this bill of ${pendingAmount}€?`
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

export default TotalExpenseComponent





  // {emp.budgets.flatMap(budget =>
  //                   budget.bills.filter(bill => bill.state === "PENDING" && store.bills)
  //                 ).map((bill) => (

 {/* {pendingBills   .filter((bill) => bill.employee_id === emp.employee_id) /  .map((bill) => ( */}