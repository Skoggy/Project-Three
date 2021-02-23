import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';


const ReturnButtonStyles = styled.button`

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