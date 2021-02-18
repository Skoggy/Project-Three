import axios from 'axios';
import { React, useState } from 'react';
import styled from 'styled-components';
import { useUserContext } from '../utils/UserContext';
import bg from '../assets/images/background.jpg';
import { withRouter } from "react-router-dom"



const Container = styled.div`
    display:flex;
    justify-content: center;
    flex-direction:row;
    padding-top:2rem;
   
    /* height:68vh; */
    @media (max-width: 500px ) {
        margin-top: 8rem;
        flex-direction:row;
    }
`
const OtherHalf = styled.div`
min-height:70vh;
border-left: 2px ridge black;
margin-left: 2rem;
background-image: url(${bg});
width:70vh;
  background-size: cover;
  @media (max-width: 500px) {
      display:none;
  }
`

const InputStyles = styled.div`
display:flex;
 /* margin-top: 14rem; */
width:70vh;
flex-direction:column;
border: 5px solid black;
align-items: center; 
justify-content: center;
font-size:5rem;
.input {
    height:5rem;
}
    `

export const LoginPage = withRouter((props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { setUser } = useUserContext()

    async function handleFormSubmit(e) {
        e.preventDefault();
        if (email && password) {
            try {
                const { data } = await axios.post(
                    '/api/login',
                    {
                        email: email,
                        password: password
                    }
                )
                setUser(data)
                localStorage.setItem('user', data.email)
                localStorage.setItem('password', data.password)
                props.history.push("/admin")
            } catch (e) {
                console.log(e)
            }
        }
        else {
            setError("There should be a password and email")
        }
    }

    return (

        <Container>

            <InputStyles>

                <h1>Login</h1>
                <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleFormSubmit}>Login</button>
                <button onClick={() => window.location.href = '/register'}>Register New Admin</button>
            </InputStyles>
            <div>{error}</div>
            <OtherHalf></OtherHalf>

        </Container >

    )
})