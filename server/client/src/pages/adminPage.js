import { React, useEffect } from 'react';
import styled from 'styled-components';

import { StockGroupList } from '../components/StockGroupList';
import { useUserContext } from '../utils/UserContext';
import axios from 'axios';
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

