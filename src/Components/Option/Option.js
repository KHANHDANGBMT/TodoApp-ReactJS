import React, { memo } from 'react';

import Button from './Button';

const option = props => {
    return (
        <div className="footer">
            <span className="todo-count">
                <strong>2</strong>
                <span></span>
                <span>item</span>
                <span>left</span>
            </span>
            <ul className="filters">
                <Button />
                <Button />
                <Button />
            </ul>
        </div>
    );
}

export default memo(option);