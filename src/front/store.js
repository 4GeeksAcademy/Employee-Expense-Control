export const initialStore = () => {
  return {
    signup: [],
    budgets: [],
    bills: [],
    supervisorName: null,
    total: [],
    employees: [],
    departments: [],
    supervisors: [],
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      },
    ],
    employeeId: null,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "signup":
      return {
        ...store,
        signup: [...store.signup, action.payload],
      };

    case "SET_BILLS":
      return {
        ...store,
        bills: action.payload,
      };

    case "SET_EMPLOYEES":
      return {
        ...store,
        employees: action.payload,
      };

    case "SET_DEPARTMENTS":
      return {
        ...store,
        departments: action.payload,
      };
    case "SET_SUPERVISORS":
      return {
        ...store,
        supervisors: action.payload,
      };

    case "EDIT_BILL":
      const updatedBill = action.payload;

      return {
        ...store,
        budgets: store.budgets.map((budget) => {
          if (budget.id === updatedBill.budget_id) {
            return {
              ...budget,
              bills: budget.bills.map((bill) =>
                bill.id === updatedBill.id ? updatedBill : bill
              ),
            };
          }
          return budget;
        }),
      };

    case "DELETE_BILL":
      const { billId, budgetId } = action.payload;

      return {
        ...store,
        budgets: store.budgets.map((budget) => {
          if (budget.id !== budgetId) return budget;

          return {
            ...budget,
            bills: budget.bills.filter((bill) => bill.id !== billId),
          };
        }),
      };

    case "DELETE_BUDGET": {
      const { budgetId } = action.payload;
      return {
        ...store,
        budgets: store.budgets.filter((budget) => budget.id !== budgetId),
      };
    }

    case "SET_BUDGETS": // Usamos el mismo case
      return {
        ...store,
        budgets: action.payload.budgets,
        supervisorName: action.payload.supervisorName,
      };

    case "SET_TOTAL_EXPENSE":
      return {
        ...store,
        total: action.payload,
      };

    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };

    case "add_task":
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        ),
      };

    case "EDIT_BUDGET":
      const updated = action.payload;
      return {
        ...store,
        budgets: store.budgets.map((budget) =>
          budget.id === updated.id ? updated : budget
        ),
      };

    case "UPDATE_BUDGET_STATE":
      const { budgetId: updatedBudgetId, newState, newAmount } = action.payload;
      return {
        ...store,
        budgets: store.budgets.map((budget) =>
          budget.id === updatedBudgetId
            ? {
                ...budget,
                state: newState,
                ...(newAmount && { amount: newAmount }),
              }
            : budget
        ),
      };

    case "UPDATE_BILL_STATE":
      const { billId: updatedBillId, newState: updatedNewState } =
        action.payload;
      return {
        ...store,
        bills: store.bills.map((bill) =>
          bill.id === updatedBillId
            ? {
                ...bill,
                state: updatedNewState,
              }
            : bill
        ),
      };

    case "set_employee_id":
      return {
        ...store,
        employeeId: action.payload,
      };

    case "SET_USER":
      return {
        ...store,
        user: {
          id: action.payload.id,
          name: action.payload.name,
          rol: action.payload.rol,
        },
      };

    default:
      throw Error("Unknown action.");
  }
}
