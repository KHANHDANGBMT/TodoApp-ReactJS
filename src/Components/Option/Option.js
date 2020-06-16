import React, { memo, useEffect } from "react";


import Button from "./Button";
import { connect } from 'react-redux';
import { setStatusFilter, countItemLeft, clearCompleted } from '../../store/actions/index';

import * as Helper from '../Helper/Helper';
const Actions = require('../Helper/Action/Action.json');

const Option = (props) => {
  const {
    status,
    setStatusFilter,
    clearCompleted,
    todoList
  } = props;
  let itemLeft = Helper.filterByStatus(todoList, Actions.actions.active).length;
  const filterBtns = [
    {
      title: Actions.actions.all,
      isActive: status === Actions.actions.all,
      onClick: () => setStatusFilter(Actions.actions.all),
      link: "",
    },
    {
      title: Actions.actions.active,
      isActive: status === Actions.actions.active,
      onClick: () => setStatusFilter(Actions.actions.active),
      link: "active",
    },
    {
      title: Actions.actions.completed,
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
        {filterBtns.map((btn) => (
          <Button key={`btn${btn.title}`} {...btn} />
        ))}
      </ul>
      <button className="clear-completed" onClick={() => clearCompleted()}>
        Clear Completed
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    status: state.todos.status,
    todoList: state.todos.todoList
  }
}

const mapDispatchToProps = {
  setStatusFilter,
  clearCompleted,
};

export default (connect(mapStateToProps, mapDispatchToProps)(Option));
