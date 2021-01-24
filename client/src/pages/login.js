import axios from 'axios';
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

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')


    async function handleFormSubmit(e) {
        e.preventDefault();
        if (email && password) {
            await axios.post(
                'http://localhost:3001/api/login',
                {
                    email: email,
                    password: password
                })
                .then(res => window.location.href = '/admin').catch(err => console.log(err))
        } else {
            setError("Incorrect login")
        }
    }


    return (
        <InputStyles>
            <div className="form">
                <div className="login">
                    <h1>Login</h1>
                    <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    {console.log(email)}
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    {console.log(password)}
                    <button onClick={handleFormSubmit}>Login</button>
                </div>
                <div>{error}</div>
            </div>
        </InputStyles >
    )
}