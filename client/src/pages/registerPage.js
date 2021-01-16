import { React, useState, useContext } from 'react';
import { register } from '../utils/register';
import { UserContext } from '../utils/UserContext';



export const registerPage = () => {

    const { user, setUser } = useContext(UserContext);
    return (

        <div div className="registration" >
            <h1>Registration</h1>
            <pre>{JSON.stringify(user, null, 2)}</pre>

            {/* {
                user ? (<button onClick={() => { (setUser(null)) }}>Logout</button>) :
                    (<button onClick={async () => {
                        const user = await login(); setUser(user)
                    }}>Login</button>)
            } */}

            {/* <label>Username</label>
            <input type="text" onChange={(e) => setUsernameReg(e.target.value)} />
            <label>Password</label>
            <input type="text" onChange={(e) => setPasswordReg(e.target.value)} /> */}
            <button onClick={register}>Register</button>
        </div>
    )
}