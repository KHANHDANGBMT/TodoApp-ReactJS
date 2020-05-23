import React, { memo } from 'react';

const header = props => (
    <header className="header">
        <h1>Todos</h1>
        <input className="new-todo"/>
    </header>
);

export default memo(header); //memo quản lý việc render, giống pureComponent hoặc shouldComponentUpdate
// có thể sử dụng function làm đối số thứ 2 để quản lý việc update