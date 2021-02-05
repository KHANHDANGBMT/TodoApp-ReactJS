import React, { memo } from "react";

import Button from "./Button";
import { connect } from "react-redux";
import { setStatusFilter, clearCompletedTodo } from "../../store/actions";

import * as Helper from "../../Helper/Helper";
import * as Actions from "../../Helper/Actions/TodoHelper";

const todoOption = (props) => {
  const {
    status,
    setStatusFilter,
    clearCompletedTodo,
    todoList,
    isCheckedAll,
  } = props;
  let itemLeft = Helper.filterTodosByStatus(todoList, Actions.actions.active)
    .length;
  const filterBtnConfigs = [
    {
      title: Actions.actionsDisplay.all,
      isActive: status === Actions.actions.all,
      onClick: () => setStatusFilter(Actions.actions.all),
      link: "",
    },
    {
      title: Actions.actionsDisplay.active,
      isActive: status === Actions.actions.active,
      onClick: () => setStatusFilter(Actions.actions.active),
      link: "active",
    },
    {
      title: Actions.actionsDisplay.completed,
      isActive: status === Actions.actions.completed,
      onClick: () => setStatusFilter(Actions.actions.completed),
      link: "completed",
    },
  ];
 
  return (
    <div className="footer">
      <span className="todo-count">
        <strong>{itemLeft}</strong>
        <span> </span>
        <span>Item </span>
        <span>left</span>
      </span>
      <ul className="filters">
        {filterBtnConfigs.map((btn) => (
          <Button key={`btn${btn.title}`} {...btn} />
        ))}
      </ul>
      {Helper.isExitedComplete(todoList) || isCheckedAll ? (
        <button
          className="clear-completed"
          onClick={() => clearCompletedTodo()}
        >
          Clear Completed
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    status: state.todos.status,
    todoList: state.todos.todoList,
    isCheckedAll: state.todos.isCheckedAll,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCompletedTodo: () => dispatch(clearCompletedTodo()),
    setStatusFilter: (status) => dispatch(setStatusFilter(status)),
  };
};

export default memo(connect(mapStateToProps, mapDispatchToProps)(todoOption));
