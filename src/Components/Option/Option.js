import React, { memo } from 'react';

import Button from './Button';

const option = props => {
    const { status, setStatusFilter, clearCompleted, itemLeft, shouldShowClearCompleted } = props;
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
    ];

    const showClear = shouldShowClearCompleted ? <button className="clear-completed" onClick={() => clearCompleted()}>Clear Completed</button> : '';
    return (
        <div className="footer">
            <span className="todo-count">
                <strong>{itemLeft}</strong>
                <span> </span>
                <span>Item </span>
                <span>left</span>
            </span>
            <ul className="filters">
                {
                    filterBtns.map(btn => (
                        <Button key={`btn${btn.title}`} {...btn} />
                    ))
                }
            </ul>
            {showClear}
        </div>
    );
}

export default memo(option);