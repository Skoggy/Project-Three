import { React } from 'react';
import styled from 'styled-components';
import { StockGroupList } from '../components/StockGroupList';
// import { StockList } from '../components/StockList'
import { LogoutButton } from '../components/LogoutButton'



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
                {/* <StockList /> */}
            </StockPageStyles>
        </>
    )
}

