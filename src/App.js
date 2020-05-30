import React, { PureComponent } from 'react';

// Components
import Header from './Components/Header/Header';
import TodoList from './Components/Todo/TodoList';
import Option from './Components/Option/Option';

// import css
import './Css/Todo.css';
import './App.css';

const isNotCheckedAll = (todos = []) => todos.find(todo => !todo.isCompleted);

const filterByStatus = (todos = [], status = '', id = '') => {
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
    todoList: [],
    todoEditingId: '',
    isCheckedAll: false,
    status: 'ALL',
    itemLeft: 0,
    shouldShowClearCompleted: false
  }

  componentWillMount() {
    this.setState({
      isCheckedAll: isNotCheckedAll(this.state.todoList)
    })
  }

  addTodo = ((todo = {}) => {
    const todos = [...this.state.todoList, todo];
    this.countItemLeft(todos);
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
    const updateTodoList = todoList.map(todo => (todo.id === id)
      ? { ...todo, isCompleted: !todo.isCompleted }
      : { ...todo });
    this.countItemLeft(updateTodoList);
    this.setState({
      todoList: updateTodoList,
      isCheckedAll: !isNotCheckedAll(updateTodoList)
    })
  }

  checkAllTodos = () => {
    const { todoList, isCheckedAll } = this.state;
    const todos = todoList.map(todo => ({
      ...todo,
      isCompleted: !isCheckedAll
    }));
    this.countItemLeft(todos);
    this.setState(prevState => ({
      todoList: todos,
      isCheckedAll: !prevState.isCheckedAll
    }))
  }

  setStatusFilter = (status = '') => {
    this.setState({
      status
    })
  }

  removeTodo = (id = '') => {
    const { todoList } = this.state
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

  countItemLeft = (todoList = []) => {
    const todos = filterByStatus(todoList, "ACTIVE");
    console.log(todos.length);
    this.setState({
      itemLeft: todos.length
    })
  }

  render() {
    const { todoList, todoEditingId, isCheckedAll, status } = this.state;
    const showOption = todoList.length !== 0 ? <Option
      setStatusFilter={this.setStatusFilter}
      status={status}
      clearCompleted={this.clearCompleted}
      shouldShowClearCompleted={this.state.shouldShowClearCompleted}
      itemLeft={this.state.itemLeft}
    /> : '';
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
        {showOption}

      </div>
    );
  }
}

export default App;
