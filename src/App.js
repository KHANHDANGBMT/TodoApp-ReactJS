import React from "react";
import { connect } from "react-redux";

// Components
import Header from "./Components/Header/Header";
import TodoList from "./Components/Todo/TodoList";
import Option from "./Components/Option/Option";

// import css
import "./Css/Todo.css";
import "./App.css";

const App = (props) => {
  const { todoList } = props;
  const showOption = todoList.length !== 0 ? <Option /> : "";
  return (
    <div className="todoapp">
      <Header />
      <TodoList />
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
