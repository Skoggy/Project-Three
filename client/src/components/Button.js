import React from 'react';

export const Button = (props) => {
    console.log(props)
    return (
        <button
            value={props.value}
            onClick={props.handleClick}
        >

        </button>
    )

}