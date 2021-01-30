import axios from 'axios';
import { React, useState } from 'react';
import styled from 'styled-components';
import { withRouter } from "react-router-dom"
import bg from '../assets/images/background.jpg';
import { useUserContext } from '../utils/UserContext';

const Container = styled.div`

    display:flex;
    
    justify-content: center;
    flex-direction:row;
    padding-top:2rem;
   
    /* height:68vh; */
    @media (max-width: 500px ) {
        
        flex-direction:column
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



export const RegisterPage = withRouter((props) => {
    console.log(props)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { setUser } = useUserContext()

    async function handleFormSubmit(e) {
        e.preventDefault();
        if (email && password) {
            try {
                const { data } = await axios.post(
                    'http://localhost:3001/api/signup',
                    {
                        email: email,
                        password: password
                    }
                )
                setUser(data)
                props.history.push("/admin")
            } catch (e) {
                console.log(e)
            }
        }
        else {
            setError("Username or password should be set")
        }
    }

    return (

        <Container>

            <InputStyles>
                <h1>Register</h1>
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
})