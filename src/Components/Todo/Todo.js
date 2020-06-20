import React, { memo, useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import {
  getTodoEditingId,
  onEditTodo,
  markCompletedTodo,
  removeTodo,
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
    onEditTodo(
      {
        ...todo,
        text,
      },
      index
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
            onChange={() => markCompletedTodo(todo.id)}
          />
          <label onDoubleClick={() => getTodoEditingId(todo.id)}>
            {todo.text}
          </label>
          <button className="destroy" onClick={() => removeTodo(todo.id)} />
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

const mapDispatchToProps = {
  getTodoEditingId,
  onEditTodo,
  markCompletedTodo,
  removeTodo,
};

export default memo(connect(mapStateToProps, mapDispatchToProps)(Todo));
