import React from 'react';
import styled from 'styled-components'

const ContainerStyles = styled.div`

display: grid;
  grid-gap: 2rem;
   

    background-color:green;
    height: 75vh;
`
const ButtonStyles = styled.div`
display: flex;
justify-content:space-between;
align-items:center;
margin-left: 30rem;
margin-right: 30rem;
`
const IndividualButtonStyles = styled.button`
color: black;
background-color:white;
padding: 2.6rem;
width: 15rem;
`

export const frontPage = () => {
    return (
        <ContainerStyles className="container sm mx-auto">
            <ButtonStyles>
                <IndividualButtonStyles>Admin Login</IndividualButtonStyles>

                <IndividualButtonStyles>Take Item</IndividualButtonStyles>
            </ButtonStyles>

        </ContainerStyles>
    )
}