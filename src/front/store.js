export const initialStore=()=>{
  return{
    message: null,
    signup: [],
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
      }
    ],
    employeeId: null
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'signup':
      return {
        ...store,
        signup: [...store.signup, action.payload]
      };
      
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
      
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

      case 'set_employee_id':
      return {
        ...store,
        employeeId: action.payload
      };
      
    default:
      throw Error('Unknown action.');
  }    
}
