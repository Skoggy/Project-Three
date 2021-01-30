import { React, useEffect } from 'react';
import styled from 'styled-components';

import { StockGroupList } from '../components/StockGroupList';
import { useUserContext } from '../utils/UserContext';



const StockPageStyles = styled.div`
display: flex;
flex-direction:row;

`


export const Admin = () => {

    const { setUser, user } = useUserContext()

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user")

        if (loggedInUser) {
            const user = (loggedInUser);
            setUser(user);
        }
    }, []);


    return (
        <>
            <StockPageStyles>
                <StockGroupList />

            </StockPageStyles>

        </>
    )
}

