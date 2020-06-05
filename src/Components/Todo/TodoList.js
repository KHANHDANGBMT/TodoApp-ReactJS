import React, { memo } from 'react';

import Todo from './Todo';

const todoLists = props => {
  const { todoList, isCheckedAll, checkAllTodos } = props;
  return (
    <section className="main">
      <input className="toggle-all" type="checkbox"
        onChange={()=>checkAllTodos()}
        checked={!!isCheckedAll} value=""/>
      <label
        htmlFor="toggle-all"
        onClick={checkAllTodos}
      ></label>
      <ul className="todo-list">
        {
          todoList.map((todo, index) => {
            return <Todo key={`todo${todo.id}`}  {...{ todo }} {...props} index={index} />
          })
        }
      </ul>
    </section>
  );
}

export default memo(todoLists);