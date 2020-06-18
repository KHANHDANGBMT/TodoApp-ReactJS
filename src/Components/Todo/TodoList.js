import React from 'react';
import { connect } from 'react-redux';
import Todo from './Todo';
import { checkAllTodos } from "../../store/actions/index";
import * as Helper from '../Helper/Helper';

const todoLists = props => {
  const { todoList, isCheckedAll, checkAllTodos, status } = props;
  const todoLists = Helper.filterTodosByStatus(todoList, status);
  const displaySelectAll = todoList.length >= 1 ? true : false;
  return (
    <section className="main">
      <input className="toggle-all" type="checkbox"
        onChange={()=>checkAllTodos()}
        checked={!!isCheckedAll} value=""/>
      {
        displaySelectAll ? <label
        htmlFor="toggle-all"
        onClick={checkAllTodos}
      ></label> : ''
      }
      <ul className="todo-list">
        {
          todoLists.map((todo, index) => {
            return <Todo key={`todo${todo.id}`}  {...{ todo }} {...props} index={index} />
          })
        }
      </ul>
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    todoList: state.todos.todoList,
    isCheckedAll: state.todos.isCheckedAll,
    status: state.todos.status
  }
}

const mapDispatchToProps = {
  checkAllTodos
};

export default connect(mapStateToProps, mapDispatchToProps)(todoLists);