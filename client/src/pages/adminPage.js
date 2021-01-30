import { React } from 'react';
import styled from 'styled-components';
import { StockGroupList } from '../components/StockGroupList';

import { LogoutButton } from '../components/LogoutButton'
import { AddStock } from '../components/AddStock';



const StockPageStyles = styled.div`
display: flex;
flex-direction:row;

`


export const Admin = () => {


    return (
        <>


            <StockPageStyles>
                <StockGroupList />

            </StockPageStyles>

        </>
    )
}

