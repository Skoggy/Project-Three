import React from 'react';
import styled from 'styled-components';

const HeaderStyles = styled.header`
* {
background-color: var(--lightBlue);
height: 150px;
}
`

export default function Header() {
    return (
        <HeaderStyles> MATE</HeaderStyles>
    )
}
