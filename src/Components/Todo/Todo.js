import React, { memo } from 'react';

const todo = props => {
  const todo = props;
  return (
    <li>
      <div className="view">
        <input className="toggle" type="checkbox" checked={todo.isCompleted} />
        <label>{todo.text}</label>
        <button className="destroy" />
      </div>
    </li>
  );
  
}

export default memo(todo);