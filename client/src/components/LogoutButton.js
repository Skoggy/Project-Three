import React from 'react';

import { connect } from 'react-redux';
import styled from 'styled-components';

import { LOGOUT_ACTION } from '../redux/actions';

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}



const LogoutButtonStyles = styled.button`

`
export const LogoutButton = connect(mapStateToProps)(function ({ dispatch, user }) {

    return (
        <div>
            <button
                onClick={() => {
                    dispatch({ type: LOGOUT_ACTION });
                    localStorage.setItem("token", null);
                }}
            >Logout</button>
        </div>
    )
});