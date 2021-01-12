import React from 'react';
import styled from 'styled-components';

const HeaderStyles = styled.div`
 
background-color: var(--lightBlue);
height: 6rem;
text-align: center;
font-size: 4rem;

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
