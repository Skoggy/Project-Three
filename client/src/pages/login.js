import React from 'react';
import styled from 'styled-components';


export const LoginPage = () => {
    return (
        <div className="App">
            <div className="registration">
                <h1>Registration</h1>
                <label>Username</label>
                <input type="text" />
                <label>Passport</label>
                <input type="text" />
                <button>Register</button>
            </div>
            <div class="login">
                <h1>Login</h1>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button>Login</button>
            </div>
        </div>
    )
}