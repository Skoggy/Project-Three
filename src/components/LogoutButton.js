import React from 'react';
import { withRouter } from "react-router-dom"


export const LogoutButton = withRouter((props) => {



    const logout = (e) => {
        e.preventDefault();
        props.history.push("/")
    }
    return (
        <button onClick={logout}>Logout</button>
    )
})