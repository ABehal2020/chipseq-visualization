import React from 'react';
import './defaultBack.scss';

const DefaultBack = (props) => {
    return (
        <div className="no-page">
            <h1>404 Page Not Found</h1>
            {props.children}
        </div>
    )
}

export default DefaultBack;