import React, { memo } from 'react';

import Button from './Button';

const option = props => {
    const { status, setStatusFilter, clearCompleted } = props;
    const filterBtns = [
        {
            title: "All",
            isActive: status === "ALL",
            onClick: () => setStatusFilter('ALL'),
            link: ''
        }, {
            title: "Active",
            isActive: status === "ACTIVE",
            onClick: () => setStatusFilter('ACTIVE'),
            link: 'active'
        }, {
            title: "Completed",
            isActive: status === "COMPLETED",
            onClick: () => setStatusFilter('COMPLETED'),
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
                        <Button key={`btn${btn.title}`} {...btn} />
                    ))
                }
            </ul>
            <button className="clear-completed" onClick={() => clearCompleted()}>Clear-completed</button>
        </div>
    );
}

export default memo(option);