import React from 'react';
import styled from 'styled-components'



const ContainerStyles = styled.div`
background-color:white;
    display:flex;
    align-items:center;
    justify-content: center;
    padding-top:2rem;
    margin-top: 14rem;
    /* height:68vh; */
    @media (max-width: 500px ) {
        margin-top: 8rem;
        flex-direction:column
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

export const frontPage = () => {
    return (

        <ContainerStyles>

            <Button onClick={() => window.location.href = '/login'}>Admin Login</Button>

            <Button onClick={() => window.location.href = '/takeitem'}>Take Item</Button>


        </ContainerStyles>


    )
}