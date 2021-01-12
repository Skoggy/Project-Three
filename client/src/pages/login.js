import { React, useState } from 'react';
import styled from 'styled-components';

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

    const [usernameReg, setUsernameReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')





    return (
        <InputStyles>
            <div className="form">
                <div className="registration">
                    <h1>Registration</h1>
                    <label>Username</label>
                    <input type="text" onChange={(e) => setUsernameReg(e.target.value)} />
                    <label>Password</label>
                    <input type="text" onChange={(e) => setPasswordReg(e.target.value)} />
                    <button>Register</button>
                </div>
                <div class="login">
                    <h1>Login</h1>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <button>Login</button>
                </div>
            </div>
        </InputStyles>
    )
}