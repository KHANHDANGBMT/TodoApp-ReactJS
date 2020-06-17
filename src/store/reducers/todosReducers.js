import {
  ADD_TODO,
  ON_EDIT_TODO,
  GET_TODO_EDITING_ID,
  MARK_COMPLETED_TODO,
  CHECK_ALL_TODOS,
  REMOVE_TODO,
  SET_STATUS_FILTER,
  CLEAR_COMPLETED,
} from "../actions/index";
import * as Helper from "../../Components/Helper/Helper";

const Actions = require("../../Components/Helper/Action/Action.json");

const INITIAL_STATE = {
  todoList: [],
  todoEditingId: "",
  isCheckedAll: false,
  status: "ALL",
};

const todoReducers = (state = INITIAL_STATE, action) => {
  const { todoList, isCheckedAll } = state;
  const list = JSON.parse(JSON.stringify(todoList));
  switch (action.type) {
    case ADD_TODO:
      return Object.assign({}, state, {
        todoList: [...list, action.todo],
      });
    case ON_EDIT_TODO:
      if (action.index >= 0) {
        list.splice(action.index, 1, action.todo);
      }
      return Object.assign({}, state, {
        todoList: list,
        todoEditingId: "",
      });
    case GET_TODO_EDITING_ID:
      return Object.assign({}, state, {
        todoEditingId: action.id,
      });
    case MARK_COMPLETED_TODO:
      const updateTodoList = list.map((todo) =>
        todo.id === action.id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : { ...todo }
      );
      return Object.assign({}, state, {
        todoList: updateTodoList,
        isCheckedAll: !Helper.isNotCheckedAll(updateTodoList),
      });
    case CHECK_ALL_TODOS:
      return Object.assign({}, state, {
        todoList: todoList.map((todo) => ({
          ...todo,
          isCompleted: !isCheckedAll,
        })),
        isCheckedAll: !isCheckedAll,
      });
    case REMOVE_TODO:
      return Object.assign({}, state, {
        todoList: Helper.filterByStatus(
          list,
          Actions.actions.remove,
          action.id
        ),
        isCheckedAll: todoList.length >= 1 ? false : true
      });
    case SET_STATUS_FILTER:
      return Object.assign({}, state, {
        status: action.status,
      });
    case CLEAR_COMPLETED:
      return Object.assign({}, state, {
        todoList: Helper.filterByStatus(list, Actions.actions.active),
        isCheckedAll: false
      });
    default:
      return state;
  }
};

export default todoReducers;
