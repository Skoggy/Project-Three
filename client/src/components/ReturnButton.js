import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';


const ReturnButtonStyles = styled.button`

font-size:30px;
border-radius: 5px;
background-color:white;

`


export const ReturnButton = withRouter((props) => {
    const returnToHomePage = (e) => {
        e.preventDefault();
        props.history.push('/')
    }
    return (
        <ReturnButtonStyles onClick={returnToHomePage}>Return</ReturnButtonStyles>
    )

})