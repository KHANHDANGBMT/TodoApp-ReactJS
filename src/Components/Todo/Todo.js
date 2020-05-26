import React, { memo, useState } from 'react';

const Todo = props => {
  const { todo, getTodoEditingId, todoEditingId, onEditedTodo, index, markCompletedTodo } = props;
  const [text, setText] = useState(todo.text);
  const isEditing = todoEditingId === todo.id;
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
          <label onDoubleClick={() => getTodoEditingId(todo.id)}>{todo.text}</label>
          <button className="destroy" />
        </div> :
          <input
            className="edit"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                editTodo();
              }
            }}
            onBlur={(e)=>editTodo()}
          />
      }
    </li>
  );

}

export default memo(Todo);