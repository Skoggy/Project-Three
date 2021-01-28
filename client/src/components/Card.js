import React from 'react';


export const Card = ({ title, body, amount }) => {
    return (
        <div>
            <div>
                <h2>{title}</h2>
            </div>
            <div>{body}</div>
            <div>{amount}</div>
        </div>
    )
}