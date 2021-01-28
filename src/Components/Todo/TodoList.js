import React, { useState } from "react";
import { connect } from "react-redux";
import Todo from "./Todo";
import {  toggleSelectAll } from "../../store/actions/index";
import * as Helper from "../../Helper/Helper";

const TodoLists = (props) => {
  const { todoList, isCheckedAll, toggleSelectAll, status } = props;
  const todoLists = Helper.filterTodosByStatus(todoList, status);
  const displaySelectAll = todoList?.length >= 1;

  return (
    <section className="main">
      <input
        className="toggle-all"
        type="checkbox"
        onChange={()=>toggleSelectAll(isCheckedAll)}
        checked={!!isCheckedAll}
        value=""
      />
      {displaySelectAll && (
        <label
          htmlFor="toggle-all"
          onClick={()=>toggleSelectAll(isCheckedAll)}
        ></label>
      )}
      <ul className="todo-list">
        {todoLists.map((todo, index) => {
          return <Todo key={index} {...{ todo }} {...props} index={index} />;
        })}
      </ul>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    todoList: state.todos.todoList,
    isCheckedAll: state.todos.isCheckedAll,
    status: state.todos.status,
  };
};

const mapDispatchToProps = dispatch =>{
  return {
    toggleSelectAll: (status) => dispatch(toggleSelectAll(status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoLists);
