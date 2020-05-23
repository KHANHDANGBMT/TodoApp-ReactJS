import React, { memo } from 'react';

import Todo from './Todo';

const todoList = props => {
  return (
    <section className="main">
      <input className="toggle-all" />
      <label htmlFor="toggle-all"></label>
      <ul className="todo-list">
        <Todo />
      </ul>
    </section>
  );
}

export default memo(todoList);