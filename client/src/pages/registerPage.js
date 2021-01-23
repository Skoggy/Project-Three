import axios from 'axios';
import { React, useState } from 'react';
import { register } from '../utils/reg';
// import { UserContext } from '../utils/UserContext';



export const RegisterPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')


    async function handleFormSubmit(e) {
        e.preventDefault();
        if (email && password) {
            await axios.post(
                'http://localhost:3001/api/signup',
                {
                    email: email,
                    password: password
                }
            )
                .then(res => window.location.href = '/').catch(err => console.log(err))
        }
        else {
            setError("Username or password should be set")
        }
    }

    // const { user, setUser } = useContext(UserContext);

    return (

        <div className="registration" >
            <h1>Registration</h1>
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
            <label>Password</label>
            {console.log(email)}
            <input type="text" onChange={(e) => setPassword(e.target.value)} />
            {console.log(password)}
            <button onClick={handleFormSubmit}>Register</button>
            <div>{error}</div>
        </div>
    )
}