import { combineReducers } from 'redux';
import todosReducers from './todosReducers';

export default combineReducers({
    todos: todosReducers
});