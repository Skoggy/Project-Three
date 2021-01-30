import React from "react";

// This file exports the Input, TextArea, and FormBtn components



export function Input(props) {
    return (
        <div>
            <input {...props}
                onChange={props.onChange} />
        </div>
    );
}

export function TextArea(props) {
    return (
        <div>
            <textarea  {...props} />
        </div>
    );
}

export function FormBtn(props) {
    return (
        <button {...props} >
            {props.children}
        </button>
    );
}
