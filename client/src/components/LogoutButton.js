import React from 'react';
import { ReturnButton } from './ReturnButton';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { LOGOUT_ACTION } from '../redux/actions';

const Button = styled.button`
font-size:30px;
border-radius: 5px;
background-color:white;
`



function mapStateToProps(state) {
    return {
        user: state.user,
    }
}
export const LogoutButton = connect(mapStateToProps)(function ({ dispatch, user }) {

    return (
        <div>
            {user && (
                <Button
                    onClick={() => {
                        dispatch({ type: LOGOUT_ACTION });
                        localStorage.setItem("token", null);
                    }}
                >Logout</Button>
            )}
            {!user && (
                <ReturnButton />
            )}
        </div>
    )
});