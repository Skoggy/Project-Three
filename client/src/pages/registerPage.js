import { React, useState, useContext } from 'react';
import { register } from '../utils/register';
import { UserContext } from '../utils/UserContext';



export const registerPage = () => {

    const [username, setUsername] = setState('')
    const [password, setPassword] = setState('')
    const [error, setError] = useState('')


    function handleFormSubmit(event) {
        event.preventDefault();
        if (username && password) {
            API.signUp({
                username: username,
                password: password
            })
                .then(res => window.location.href = ).catch(err => console.log(err))
        }
        else {
            setError("Username or password should be set")
        }
    }



    // const { user, setUser } = useContext(UserContext);

    return (

        <div className="registration" >
            <h1>Registration</h1>
            <input type="text" onChange={(e) => setUsername(e.target.value)} />
            <label>Password</label>
            <input type="text" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleFormSubmit}>Register</button>
            <div>{error}</div>
        </div>
    )
}