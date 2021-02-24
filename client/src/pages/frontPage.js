import React from 'react';
import styled from 'styled-components'
import { withRouter } from "react-router-dom"

const ContainerStyles = styled.div`
background-color:white;
height: 100%;
display:grid;
grid-template-columns: 1fr 1fr;
align-items:center;
justify-items:center;

    @media (max-width: 500px ) {
        grid-template-columns: auto;
    }
`

const Button = styled.button`
    
	padding: 2rem 2rem; 
    margin: 0px 2rem 2rem 0px;
    max-width:30rem;
	border-radius: 10px;
	font-size: 2rem;
	color: #FFF;
	text-decoration: none;	
	transition: all 0.1s;
    -webkit-transition: all 0.1s;
    background-color: var(--red);
	border-bottom: 5px solid var(--darkRed);
    text-shadow: 0px -2px var(--darkRed);
   :active{ 
    transform: translate(0px,5px);
  -webkit-transform: translate(0px,5px);
    border-bottom: 1px solid;
    outline:none;  
   }
`

export const frontPage = withRouter((props) => {
    return (
        <ContainerStyles>
            <Button onClick={() => props.history.push('/login')}>Admin Login</Button>
            <Button onClick={() => props.history.push('/takeitem')}>Take Item</Button>
        </ContainerStyles>
    )
})