import { React, useContext } from 'react';
import styled from 'styled-components';
import { StockGroupList } from '../components/StockGroupList';
// import { StockList } from '../components/StockList'
import { LogoutButton } from '../components/LogoutButton'
import { UserContext } from '../utils/UserContext';


const StockPageStyles = styled.div`
display: flex;
flex-direction:row;
`


export const Admin = () => {
    const { user, setUser } = useContext(UserContext)

    return (
        <>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <LogoutButton />
            <StockPageStyles>
                <StockGroupList />
                {/* <StockList /> */}
            </StockPageStyles>
        </>
    )
}

