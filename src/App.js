import React, { Component } from 'react';

// Components
import Header from './Components/Header/Header';
import TodoList from './Components/Todo/TodoList';
import Option from './Components/Option/Option';

// import css
import './Css/Todo.css';
import './App.css';

class App extends Component { 
  render() {
    return (
      <div className="todoapp">
        <Header />
        <TodoList />
        <Option/>
      </div>
    );
  }
}

export default App;
