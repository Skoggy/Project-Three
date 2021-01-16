import { React, useState, useContext } from 'react';
import styled from 'styled-components';
import { login } from '../utils/login';

import { UserContext } from '../utils/UserContext';

const InputStyles = styled.div`
.form {
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
}
.form input {
margin: 10px;
}
`

export const LoginPage = () => {

    // const [usernameReg, setUsernameReg] = useState('')
    // const [passwordReg, setPasswordReg] = useState('')
    const { user, setUser } = useContext(UserContext);

    return (
        <InputStyles>
            <div className="form">

                <div>{user}</div>
                <div class="login">
                    <h1>Login</h1>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <button>Login</button>
                </div>
            </div>
        </InputStyles >
    )
}