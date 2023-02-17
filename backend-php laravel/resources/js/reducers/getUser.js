const getUser = (state = [], action) => {
    console.log(action);
    switch (action.type) {
      case "TODO_GET_USER":
        return [
          ...state,
          {
            id: action.id,
            text: action.text
           
          }
        ];
    //   case "TOGGLE_TODO":
    //     return state.map(todo =>
    //       todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
    //     );
      default:
        return state;
    }
  };
  
  export default getUser;