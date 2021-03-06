import React from 'react';
import styled from 'styled-components';
import { LogoutButton } from '../components/LogoutButton'

const HeaderStyles = styled.div`
 display:grid;
 grid-template-columns: 1fr 10fr;
background-color: var(--red);
align-items:center;
justify-items:center;
padding-right:100px;
height: 7rem;
/* text-align: center; */
font-size: 5rem;
color:white;
border-radius:8px;
margin-right: 5px;
`

export default function Header() {
    return (
        <HeaderStyles>
            <LogoutButton />
            <div>
                StockTake
        </div>
        </HeaderStyles>

    )
}
