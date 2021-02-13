import { React, useEffect } from 'react';
import styled from 'styled-components';

import { StockGroupList } from '../components/StockGroupList';

import { LogoutButton } from '../components/LogoutButton';


const StockPageStyles = styled.div`
display: flex;
flex-direction:row;

`


export const Admin = () => {

    return (
        <>
            <LogoutButton />
            <StockPageStyles>
                <StockGroupList />
            </StockPageStyles>

        </>
    )
}

