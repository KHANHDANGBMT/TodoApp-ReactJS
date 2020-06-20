import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../../store/actions';

const Header = props => {
    const [text, setText] = useState('');
    const { addTodo } = props;
    const onAddTodo = (e = {}) => {
        if (e.key === 'Enter' && text.trim()) {
            const newText = text.trim();
            addTodo({
                id: new Date().valueOf(),
                text: newText,
                isCompleted: false
            });
            setText("");
        }
    }

    return (
        <header className="header">
            <h1>Todos</h1>
            <input
                value={text}
                className="new-todo"
                onChange={(e) => setText(e.target.value)}
                onKeyPress={(e) => onAddTodo(e)}
            />
        </header>
    );
}
const mapDispatchToProps = {
    addTodo
}
export default memo(connect(null, mapDispatchToProps)(Header)); //memo quản lý việc render, giống pureComponent hoặc shouldComponentUpdate
// có thể sử dụng function làm đối số thứ 2 để quản lý việc update