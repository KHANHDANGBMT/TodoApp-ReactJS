import React, { memo } from 'react';

const button = props => {
    return (
        <>
            <li>
                <a
                    href="#"
                    className={"selected"}
                    onClick={() => {}}
                >
                    All
                </a>
            </li>
            <span></span>
        </>
    );
}

export default memo(button);