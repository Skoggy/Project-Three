import { React, useEffect } from 'react'
import axios from 'axios';

export const login = async () => {
    const result = await axios(
        'http://localhost:3001/api/login'
    );
    console.log(result)
};

export const register = async () => {
    const result = await axios.post(
        'http://localhost:3001/api/register',
        { name: "chris", password: "1234", isAuth: true }
    );
    console.log(result)
}