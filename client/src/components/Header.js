import React from 'react';
import styled from 'styled-components';
import { LogoutButton } from '../components/LogoutButton'

const HeaderStyles = styled.div`
 
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
            <div>
                StockTake
        </div>
        </HeaderStyles>
    )
}
