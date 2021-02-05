import * as Actions from "./Actions/TodoHelper";
export const filterTodosByStatus = (todos = [], status = "", id = "") => {
  switch (status) {
    case Actions.actions.active:
      return todos.filter((todo) => !todo.isCompleted);
    case Actions.actions.completed:
      return todos.filter((todo) => todo.isCompleted);
    case Actions.actions.remove:
      return todos.filter((todo) => todo.id !== id);
    default:
      return todos;
  }
};

export const isNotCheckedAll = (todos = []) =>
  todos.find((todo) => !todo.isCompleted);

export const isExitedComplete = (todos = []) => {
  let isExitedComplete = false;
  todos.map((item) => {
    isExitedComplete = isExitedComplete ^ item.isCompleted;
  });
    return isExitedComplete
};
