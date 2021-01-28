import axios from "axios";

export const ADD_TODO = "ADD_TODO";
export const GET_TODO_EDITING_ID = "GET_TODO_EDITING_ID";
export const ON_EDIT_TODO = "ON_EDIT_TODO";
export const MARK_COMPLETED_TODO = "MARK_COMPLETED_TODO";
export const CHECK_ALL_TODOS = "CHECK_ALL_TODOS";
export const REMOVE_TODO = "REMOVE_TODO";
export const SET_STATUS_FILTER = "SET_STATUS_FILTER";
export const CLEAR_COMPLETED = "CLEAR_COMPLETED";
export const GET_TODO = "GET_TODO";
export const UPDATE_ONE_TODO = "UPDATE_ONE_TODO";

const baseUrl = "http://localhost:5123/todo";

export const addTodo = (todo = {}) => {
  return {
    todo,
    type: ADD_TODO,
  };
};

export const getTodoEditingId = (id = "") => {
  return {
    id,
    type: GET_TODO_EDITING_ID,
  };
};

export const onEditTodo = (todo = {}, index = -1) => {
  return {
    todo,
    index,
    type: ON_EDIT_TODO,
  };
};

export const markCompletedTodo = (id = "") => {
  return {
    id,
    type: MARK_COMPLETED_TODO,
  };
};

export const checkAllTodos = () => {
  return {
    type: CHECK_ALL_TODOS,
  };
};

export const removeTodo = (id = "") => {
  return {
    id,
    type: REMOVE_TODO,
  };
};

export const setStatusFilter = (status = "") => {
  return {
    status,
    type: SET_STATUS_FILTER,
  };
};

export const clearCompleted = (status = "") => {
  return {
    status,
    type: CLEAR_COMPLETED,
  };
};

// get todo list
const get_todo = (data) => {
  return {
    type: GET_TODO,
    todoList: data,
  };
};

export const getTodo = () => {
  return async (dispatch) => {
    await axios
      .get(baseUrl + "/get")
      .then((res) => {
        dispatch(get_todo(res.data));
      })
      .catch((err) => {
        console.log("get data error: " + err);
      });
  };
};

// update one todo
export const updateOneTodo = (todo, index, type = "") => {
  return async (dispatch) => {
    await axios
      .put(baseUrl + "/update", { data: todo })
      .then((res) => {
        console.log("todo update: ", todo);
        if (type === "markCompletedTodo") {
          dispatch(markCompletedTodo(todo.id));
        } else {
          dispatch(onEditTodo(todo, index));
        }
      })
      .catch((err) => {
        console.log("error update one todo: " + err);
      });
  };
};

// delete one todo
export const deleteOneTodo = (todo) => {
  return async (dispatch) => {
    await axios
      .delete(baseUrl + "/delete", { data: todo })
      .then((res) => {
        dispatch(removeTodo(todo.id));
      })
      .catch((err) => {
        console.log("error when delete todo: " + err);
      });
  };
};

// add new todo
export const addOneTodo = (todo) => {
  return async (dispatch) => {
    await axios
      .post(baseUrl + "/add", todo)
      .then((res) => {
        dispatch(addTodo(todo));
      })
      .catch((err) => {
        console.log("error when add new todo: " + err);
      });
  };
};

// clear completed
export const clearCompletedTodo = () => {
  return async (dispatch) => {
    await axios
      .delete(baseUrl + "/clearCompleted")
      .then((res) => {
        dispatch(clearCompleted());
      })
      .catch((err) => {
        console.log("clear completed error: " + err);
      });
  };
};

export const toggleSelectAll = (status) => {
  return async (dispatch) => {
    await axios
      .post(baseUrl + "/updateMany", { status: status })
      .then((res) => {
        dispatch(checkAllTodos());
      })
      .catch((err) => {
        console.log("error when toggleSelect: " + err);
      });
  };
};
