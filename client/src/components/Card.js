import React from 'react';
import styled from 'styled-components'

export const Card = ({ title, body, amount }) => {

    const CardContainer = styled.div`
  
    `
    const CardTitle = styled.div`
    
    `

    return (

        <CardContainer>
            <div className="card-title">
                <h2>{title}</h2>
            </div>
            <div className='card-amount'>{amount}</div>
        </CardContainer>
    )


}