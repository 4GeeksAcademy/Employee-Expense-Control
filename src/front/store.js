export const initialStore = () => {
  return {
    budgets: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "SET_BUDGETS":
      return {
        ...store,
        budgets: action.payload,
      };
    default:
      throw Error("Unknown action.");
  }
}
