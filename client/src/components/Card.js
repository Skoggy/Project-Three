import React from 'react';
import styled from 'styled-components'

export const Card = ({ title, body, amount }) => {

    const CardContainer = styled.div`
    width:300px;
    overflow: hidden;
    box-shadow: 0px 0px 15px -5px;
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