import React from 'react';
import axios from 'axios';

export const LogoutButton = () => {


    const logoutURL = 'http://localhost:3001/api/logout'

    const logout = (e) => {
        e.preventDefault();
        axios.get(logoutURL)
            .then(res => window.location.href = '/').catch(err => console.log(err))

    }

    return (
        <button onClick={logout}>Logout</button>
    )
}