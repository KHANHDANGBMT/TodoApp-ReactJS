import React, { Component } from "react";
import { connect } from "react-redux";

// Components
import Header from "./Components/Header/Header";
import TodoList from "./Components/Todo/TodoList";
import Option from "./Components/Option/Option";

import * as Helper from "./Components/Helper/Helper";

// import css
import "./Css/Todo.css";
import "./App.css";

// import actions.json
const Actions = require("./Components/Helper/Action/Action.json");

const App = (props) => {
  // state = {
  //   todoList: this.props.todoList,
  //   todoEditingId: "",
  //   isCheckedAll: false,
  //   status: "ALL",
  // };

  // addTodo = (todo = {}) => {
  //   this.setState((prevState) => ({
  //     todoList: [...prevState.todoList, todo],
  //   }));
  // };

  // getTodoEditingId = (id = "") => {
  //   this.setState({
  //     todoEditingId: id,
  //   });
  // };

  // onEditedTodo = (todo = {}, index = -1) => {
  //   if (index >= 0) {
  //     const { todoList: list } = this.state;
  //     console.log(list);
  //     list.splice(index, 1, todo);
  //     this.setState({ todoList: list, todoEditingId: "" });
  //   }
  // };

  // markCompletedTodo = (id = "") => {
  //   const { todoList } = this.state;
  //   const updateTodoList = todoList.map((todo) =>
  //     todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : { ...todo }
  //   );
  //   this.setState({
  //     todoList: updateTodoList,
  //     isCheckedAll: !Helper.isNotCheckedAll(updateTodoList),
  //   });
  // };

  // checkAllTodos = () => {
  //   const { todoList, isCheckedAll } = this.state;
  //   const todos = todoList.map((todo) => ({
  //     ...todo,
  //     isCompleted: !isCheckedAll,
  //   }));
  //   this.setState((prevState) => ({
  //     todoList: todos,
  //     isCheckedAll: !prevState.isCheckedAll,
  //   }));
  // };

  // setStatusFilter = (status = "") => {
  //   this.setState({
  //     status,
  //   });
  // };

  // removeTodo = (id = "") => {
  //   const { todoList } = this.state;
  //   this.setState({
  //     todoList: Helper.filterByStatus(todoList, Actions.actions.remove, id),
  //   });
  // };

  // clearCompleted = () => {
  //   const { todoList } = this.state;
  //   this.setState({
  //     todoList: Helper.filterByStatus(todoList, Actions.actions.active),
  //   });
  // };

  // countItemLeft = (todoList = []) => {
  //   const todos = Helper.filterByStatus(todoList, Actions.actions.active);
  //   return todos.length;
  // };

  const { todoList } = props;
  const showOption =
    todoList.length !== 0 ? (
      <Option
      //setStatusFilter={this.setStatusFilter}
      //status={status}
      //clearCompleted={this.clearCompleted}
      //itemLeft={this.countItemLeft(this.state.todoList)}
      />
    ) : (
      ""
    );
  return (
      <div className="todoapp">
        <Header />
        <TodoList
        //todoList={Helper.filterByStatus(todoList, status)}
        //getTodoEditingId={this.getTodoEditingId}
        //todoEditingId={todoEditingId}
        //onEditedTodo={this.onEditedTodo}
        //markCompletedTodo={this.markCompletedTodo}
        //isCheckedAll={isCheckedAll}
        //checkAllTodos={this.checkAllTodos}
        //removeTodo={this.removeTodo}
        />
        {showOption}
      </div>
  );
};
const mapStateToProps = (state) => {
  return {
    todoList: state.todos.todoList,
  };
};
export default connect(mapStateToProps)(App);
