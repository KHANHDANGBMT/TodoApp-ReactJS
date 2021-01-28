import React, { memo, useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import {
  getTodoEditingId,
  onEditTodo,
  markCompletedTodo,
  removeTodo,
  updateOneTodo,
  getTodo,
  deleteOneTodo,
} from "../../store/actions";

const Todo = (props) => {
  const clickInput = useRef(null);
  const {
    todo,
    getTodoEditingId,
    todoEditingId,
    onEditTodo,
    index,
    markCompletedTodo,
    removeTodo,
    updateOneTodo,
    getTodo,
    setIsRender,
    deleteOneTodo,
  } = props;
  const [text, setText] = useState(todo.text);
  const isEditing = todoEditingId === todo.id;
  useEffect(() => {
    if (isEditing) {
      clickInput.current.focus();
    }
  });
  const editTodo = () => {
    if (text.trim() === "") {
      removeTodo(todo.id);
      return;
    }
    updateOneTodo(
      {
        ...todo,
        text,
      },
      index,"edit"
    );
  };
  return (
    <li
      className={`${isEditing ? "editing" : ""} ${
        todo.isCompleted ? "completed" : ""
      }`}
    >
      {!isEditing ? (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.isCompleted}
            name="name"
            onChange={() => {
              let promiseComplete = new Promise((resolve, reject) => {
                updateOneTodo(
                  { ...todo, isCompleted: !todo.isCompleted },
                  index,
                  "markCompletedTodo"
                );
              });
              promiseComplete.then((res) => {
                markCompletedTodo(todo.id);
              });
            }}
          />
          <label onDoubleClick={() => getTodoEditingId(todo.id)}>
            {todo.text}
          </label>
          <button
            className="destroy"
            onClick={() => {
              deleteOneTodo(todo);
            }}
          />
        </div>
      ) : (
        <input
          className="edit"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          ref={clickInput}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              editTodo();
               deleteOneTodo(todo);
            }
          }}
          onBlur={(e) => editTodo()}
        />
      )}
    </li>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    todoEditingId: state.todos.todoEditingId,
    ...ownProps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTodoEditingId: (id) => dispatch(getTodoEditingId(id)),
    onEditTodo: (todo, id) => dispatch(onEditTodo(todo, id)),
    markCompletedTodo: (id) => dispatch(markCompletedTodo(id)),
    removeTodo: (id) => dispatch(removeTodo(id)),
    updateOneTodo: (todo, index, type) => dispatch(updateOneTodo(todo, index, type)),
    getTodo: () => dispatch(getTodo()),
    deleteOneTodo: (todo) => dispatch(deleteOneTodo(todo)),
  };
};

export default memo(connect(mapStateToProps, mapDispatchToProps)(Todo));
  