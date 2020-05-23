import React, { PureComponent } from 'react';

// Components
import Header from './Components/Header/Header';
import TodoList from './Components/Todo/TodoList';
import Option from './Components/Option/Option';

// import css
import './Css/Todo.css';
import './App.css';

class App extends PureComponent { 
  state = {
    todoList: [
      {
        id: 1,
        text: 'todo 1',
        isCompleted: false
      },
      {
        id: 2,
        text: 'todo 1',
        isCompleted: true
      }
    ]
  }

  addTodo = ((todo = {}) => {
    this.setState(prevState => ({
      todoList: [...prevState.todoList, todo]
    }))
  })

  render() {
    const { todoList } = this.state;
    return (
      <div className="todoapp">
        <Header addTodo={this.addTodo}/>
        <TodoList todoList={todoList}/>
        <Option/>
      </div>
    );
  }
}

export default App;
