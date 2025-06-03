export const initialStore = () => {
  return {
    signup: [],
    budgets: [],
    total:[],
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

    case "SET_BUDGETS":
      return {
        ...store,
        budgets: action.payload,
      };

      case "SET_TOTAL_DEPARTMENT":
        return {
          ... store,
          total: action.payload
        }
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

    case "set_employee_id":
      return {
        ...store,
        employeeId: action.payload,
      };

    default:
      throw Error("Unknown action.");
  }
}
