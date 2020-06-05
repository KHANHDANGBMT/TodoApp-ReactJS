import React, { memo } from "react";

import Button from "./Button";

const Helper = require('../Helper/Action/Action.json');

const Option = (props) => {
  const {
    status,
    setStatusFilter,
    clearCompleted,
    itemLeft
  } = props;
  const filterBtns = [
    {
      title: Helper.actions.all,
      isActive: status === Helper.actions.all,
      onClick: () => setStatusFilter(Helper.actions.all),
      link: "",
    },
    {
      title: Helper.actions.active,
      isActive: status === Helper.actions.active,
      onClick: () => setStatusFilter(Helper.actions.active),
      link: "active",
    },
    {
      title: Helper.actions.completed,
      isActive: status === Helper.actions.completed,
      onClick: () => setStatusFilter(Helper.actions.completed),
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

export default memo(Option);
