import React from 'react';
import { withRouter } from "react-router-dom"
import styled from 'styled-components';


const LogoutButtonStyles = styled.button`

`


export const LogoutButton = withRouter((props) => {



    const logout = (e) => {
        e.preventDefault();
        props.history.push("/")
    }
    return (

        <LogoutButtonStyles onClick={logout}>Logout</LogoutButtonStyles>

    )
})