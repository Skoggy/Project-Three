import axios from 'axios';
import { React, useState, useContext } from 'react';
import styled from 'styled-components';
import { UserContext, useUserContext } from '../utils/UserContext';
import bg from '../assets/images/background.jpg';


const Container = styled.div`

    display:flex;
    
    justify-content: center;
    flex-direction:row;
    padding-top:2rem;
   
    /* height:68vh; */
    @media (max-width: 500px ) {
        margin-top: 8rem;
        flex-direction:column
    }
`
const OtherHalf = styled.div`
min-height:70vh;
border-left: 5px solid black;
margin-left: 2rem;
background-image: url(${bg});
width:70vh;
  background-size: cover;
`

const InputStyles = styled.div`
 margin-top: 14rem;
    align-items: center;
    justify-content: center;
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
    const [user, setUser] = useUserContext(UserContext)

    function handleFormSubmit(e) {
        e.preventDefault();
        if (email && password) {
            // setUser(email)
            console.log(user)
            axios.post(
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

        <Container>

            <InputStyles>
                <h1>Login</h1>
                <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                {console.log(email)}
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                {console.log(password)}
                <button onClick={handleFormSubmit}>Login</button>
            </InputStyles>
            <div>{error}</div>
            <OtherHalf></OtherHalf>

        </Container >

    )
}