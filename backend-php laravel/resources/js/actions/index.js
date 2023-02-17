let nextTodoId = 0;
// export const addTodo = text => ({
//   type: "ADD_TODO",
//   id: nextTodoId++,
//   text,
//   baovic:text
// });

export function getUser(text) {
  return {
    type: "TODO_GET_USER",
    id: nextTodoId++,
    text
  };
}