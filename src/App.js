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
    ],
    todoEditingId: ''
  }

  addTodo = ((todo = {}) => {
    this.setState(prevState => ({
      todoList: [...prevState.todoList, todo]
    }))
  });

  getTodoEditingId = (id = '') => {
    this.setState({
      todoEditingId: id
    })
  }

  onEditedTodo = (todo = {}, index = -1) => {
    if (index >= 0) {
      const { todoList: list } = this.state;
      list.splice(index, 1, todo);
      this.setState({ todoList: list, todoEditingId: '' });
    }
  }

  markCompletedTodo = (id = '') => {
    const { todoList } = this.state;
    const newTodoList = todoList.map(todo => (todo.id === id) ? { ...todo, isCompleted: !todo.isCompleted } : { ...todo });
    this.setState({
      todoList: newTodoList
    })
  }

  render() {
    const { todoList, todoEditingId } = this.state;
    return (
      <div className="todoapp">
        <Header addTodo={this.addTodo}/>
        <TodoList
          todoList={todoList}
          getTodoEditingId={this.getTodoEditingId}
          todoEditingId={todoEditingId}
          onEditedTodo={this.onEditedTodo}
          markCompletedTodo={this.markCompletedTodo}
        />
        <Option/>
      </div>
    );
  }
}

export default App;
