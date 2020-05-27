import React, { PureComponent } from 'react';

// Components
import Header from './Components/Header/Header';
import TodoList from './Components/Todo/TodoList';
import Option from './Components/Option/Option';

// import css
import './Css/Todo.css';
import './App.css';

const isNotCheckedAll = (todos = []) => todos.find(todo => !todo.isCompleted);

const filterByStatus = (todos = [], status = '', id = '' ) => {
  switch (status) {
    case 'ACTIVE':
      return todos.filter(todo => !todo.isCompleted);
    case 'COMPLETED':
      return todos.filter(todo => todo.isCompleted);
    case 'REMOVE':
      return todos.filter(todo => todo.id !== id);
    default:
      return todos;
  }
}
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
    todoEditingId: '',
    isCheckedAll: false,
    status: 'ALL'
  }

  componentWillMount() {
    this.setState({
      isCheckedAll: !isNotCheckedAll(this.state.todoList)
    })
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
    const updateTodoList = todoList.map(todo => (todo.id === id) ? { ...todo, isCompleted: !todo.isCompleted } : { ...todo });
    this.setState({
      todoList: updateTodoList,
      isCheckedAll: !isNotCheckedAll(updateTodoList)
    })
  }

  checkAllTodos = () => {
    const { todoList, isCheckedAll } = this.state;
    this.setState(prevState => ({
      todoList: todoList.map(todo => ({
        ...todo,
        isCompleted: !isCheckedAll
      })),
      isCheckedAll: !prevState.isCheckedAll
    }))
  }

  setStatusFilter = (status = '') => {
    this.setState({
      status
    })
  }

  removeTodo = (id = '') => {
    const {todoList} = this.state
    this.setState({
      todoList: filterByStatus(todoList, "REMOVE", id)
    })
  }

  clearCompleted = () => {
    const { todoList } = this.state
    this.setState({
      todoList: filterByStatus(todoList, "ACTIVE")
    })
  }

  render() {
    const { todoList, todoEditingId, isCheckedAll, status } = this.state;
    return (
      <div className="todoapp">
        <Header
          addTodo={this.addTodo}
        />
        <TodoList
          todoList={filterByStatus(todoList, status)}
          getTodoEditingId={this.getTodoEditingId}
          todoEditingId={todoEditingId}
          onEditedTodo={this.onEditedTodo}
          markCompletedTodo={this.markCompletedTodo}
          isCheckedAll={isCheckedAll}
          checkAllTodos={this.checkAllTodos}
          removeTodo={this.removeTodo}
        />
        <Option
          setStatusFilter={this.setStatusFilter}
          status={status}
          clearCompleted={this.clearCompleted}
        />
      </div>
    );
  }
}

export default App;
