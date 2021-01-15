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

    const [usernameReg, setUsernameReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')

    const { user, setUser } = useContext(UserContext);



    return (
        <InputStyles>
            <div className="form">
                <div className="registration">
                    <h1>Registration</h1>
                    <pre>{JSON.stringify(user, null, 2)}</pre>

                    {user ? (<button onClick={() => { (setUser(null)) }}>Logout</button>) :
                        (<button onClick={async () => {
                            const user = await login(); setUser(user)
                        }}>Login</button>)}

                    <label>Username</label>
                    <input type="text" onChange={(e) => setUsernameReg(e.target.value)} />
                    <label>Password</label>
                    <input type="text" onChange={(e) => setPasswordReg(e.target.value)} />
                    <button>Register</button>
                </div>
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