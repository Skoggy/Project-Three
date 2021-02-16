import React from 'react';
import styled from 'styled-components';
import { LogoutButton } from '../components/LogoutButton'

const HeaderStyles = styled.div`
 display:grid;
 grid-template-columns: 1fr 10fr;
background-color: var(--red);
height: 8rem;
text-align: center;
font-size: 6rem;
color:white;
border-radius:8px;

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
