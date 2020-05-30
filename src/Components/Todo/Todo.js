import React, { memo, useState, useRef, useEffect } from 'react';

const Todo = props => {
  const clickInput = useRef(null);
  const { todo, getTodoEditingId, todoEditingId, onEditedTodo, index, markCompletedTodo, removeTodo } = props;
  const [text, setText] = useState(todo.text);
  const isEditing = todoEditingId === todo.id;
  useEffect(() => {
    if (isEditing) {
      clickInput.current.focus();
    }
  })
  const editTodo = () => {
    onEditedTodo({
      ...todo,
      text
    }, index);
  }  
  return (
    <li className={`${isEditing ? 'editing' : ''} ${todo.isCompleted ? 'completed' : ''}`}>
      {
        !isEditing ? <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => markCompletedTodo(todo.id)}
          />
          <label onDoubleClick={() => getTodoEditingId(todo.id) }>{todo.text}</label>
          <button className="destroy" onClick={() => removeTodo(todo.id)} />
        </div> :
          <input
            className="edit"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            ref={clickInput}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                editTodo();
              }
            }}
            onBlur={(e) => editTodo()}
          />
      }
    </li>
  );

}

export default memo(Todo);