import React from 'react';
import styled from 'styled-components';

const FooterStyles = styled.div`
 
background-color: var(--lightBlue);
height: 6rem;
text-align: center;
font-size: 2rem;

`

export default function Footer() {
    return (
        <FooterStyles>
            <div>
                <p>&copy; StockTake {new Date().getFullYear()}</p>
            </div>
        </FooterStyles>
    )
}
