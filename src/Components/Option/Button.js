import React, { memo } from 'react';

const button = props => {
    const { title, isActive, onClick, link } = props;
    return (
        <>
            <li>
                <a
                    href={`#/${link}`}
                    className={isActive ? "selected" : ""}
                    onClick={onClick}
                >
                    {title}
                </a>
            </li>
            <span></span>
        </>
    );
}

export default memo(button);