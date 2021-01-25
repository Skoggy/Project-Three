import React from "react";

// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
    return (
        <div className="form-group">
            <input {...props} />
        </div>
    );
}

export function TextArea(props) {
    return (
        <div className="form-group">
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
