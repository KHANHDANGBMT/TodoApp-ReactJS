import React, {useEffect} from "react";
import { connect } from "react-redux";

// Components
import Header from "./Components/Header/Header";
import TodoList from "./Components/Todo/TodoList";
import Option from "./Components/Option/Option";

// import css
import "./Css/Todo.css";
import "./App.css";

import {getTodo} from './store/actions'

const App = ({ getTodo, todoList }) => {
  useEffect(() => {
    getTodo();
  }, []);
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
const mapDispatchToProps = dispatch => {
  return {
    getTodo: ()=>dispatch(getTodo())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
