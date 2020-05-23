import React, { memo } from 'react';

import Button from './Button';

const option = props => {
    const filterBtns = [
        {
            title: "All",
            isActive: true,
            onClick: () => { },
            link: ''
        }, {
            title: "Active",
            isActive: false,
            onClick: () => { },
            link: 'active'
        }, {
            title: "Completed",
            isActive: false,
            onClick: () => { },
            link: 'completed'
        }
    ]
    return (
        <div className="footer">
            <span className="todo-count">
                <strong>2</strong>
                <span></span>
                <span>item</span>
                <span>left</span>
            </span>
            <ul className="filters">
                {
                    filterBtns.map(btn => (
                        <Button key={`btn${btn.title}`} {...btn}/>
                    ))
                }
            </ul>
            <button className="clear-completed">Clear-completed</button>
        </div>
    );
}

export default memo(option);