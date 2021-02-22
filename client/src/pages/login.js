
import { React, useState } from 'react';
import styled from 'styled-components';

import bg from '../assets/images/background.jpg';
// import { withRouter } from "react-router-dom"

import { connect } from 'react-redux';

import { login } from "../redux/actions";
import { loginAPI } from '../API/auth';

const DEFAULT_STATE = {
    email: "",
    password: "",
};

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
const LoginForm = ({ loginUser }) => {

    const [state, setState] = useState(DEFAULT_STATE);
    const [loading, setLoading] = useState(false);

    function onInputChange({ target: { name, value } }) {
        setState({ ...state, [name]: value })
    }


    return (
        <Container>
            <InputStyles>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        try {
                            const { email, password } = state;
                            if (!email || !password) return;

                            setLoading(true);
                            const { data } = await loginAPI({ email, password });
                            localStorage.setItem("token", data.data.token);
                            setLoading(false);
                            loginUser(data.data);
                        } catch (err) {
                            setLoading(false);
                            console.log(err)
                        }
                    }}
                >
                    <input
                        type="text"
                        placeholder="email"
                        name="email"
                        required
                        onChange={onInputChange}
                        value={state.email}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        name="password"
                        required
                        onChange={onInputChange}
                        value={state.password}
                    />
                    <button type="submit" disabled={loading}>
                        Login
                </button>
                </form>
            </InputStyles>
            <OtherHalf></OtherHalf>
        </Container>
    )
}
function mapDispatchToProps(dispatch) {
    return {
        loginUser: (data) => dispatch(login(data)),
    }
}

export const LoginPage = connect(() => ({}), mapDispatchToProps)(LoginForm);