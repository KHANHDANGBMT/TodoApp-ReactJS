import React, { memo, useState } from 'react';

const Header = props => {
    const [text, setText] = useState('');
    const { addTodo } = props;
    const onAddTodo = (e = {}) => {
        if (e.key === 'Enter' && text) {
            addTodo({
                id: new Date().valueOf(),
                text,
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

export default memo(Header); //memo quản lý việc render, giống pureComponent hoặc shouldComponentUpdate
// có thể sử dụng function làm đối số thứ 2 để quản lý việc update