
import { React, useState } from 'react';
import styled from 'styled-components';

import bg from '../assets/images/background.jpg';
import { connect } from "react-redux";

import { register } from "../redux/actions";

import { registerAPI } from '../API/auth';


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

const DEFAULT_STATE = {
    email: "",
    password: "",
};

export function RegisterForm(props) {
    const [state, setState] = useState(DEFAULT_STATE);

    function onTextChange({ target: { name, value } }) {
        setState({ ...state, [name]: value });
    }
    return (
        <Container>

            <InputStyles>
                <h2>Register</h2>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const { registerUser } = props;

                        const { email, password } = state;
                        if (!email || !password) return;

                        const { data } = await registerAPI({ email, password });
                        registerUser(data.data);
                    }}
                >
                    <input
                        type="text"
                        placeholder="email"
                        required
                        name="email"
                        onChange={onTextChange}
                        value={state.email}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        required
                        name="password"
                        onChange={onTextChange}
                        value={state.password}
                    />
                    <button type="submit">Click to Register</button>
                </form>
            </InputStyles>

            <OtherHalf></OtherHalf>

        </Container >
    )
}
function mapDispatchToProps(dispatch) {
    return {
        registerUser(data) {
            dispatch(register(data));
        },
    };
}
export const Register = connect(() => ({}), mapDispatchToProps)(RegisterForm);