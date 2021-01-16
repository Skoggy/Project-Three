import { React, useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../utls/UserContext';



export const Nav = () => {
    const { user } = useContext(UserContext);

    return (
        <div>Nav</div>
    )
}