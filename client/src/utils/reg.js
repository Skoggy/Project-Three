import { React, useEffect } from 'react'
import axios from 'axios';

export const register = async () => {
    const result = await axios.post(
        'http://localhost:3001/api/signup',
        {
            name: "Chris",
            password: '1234'
        }
    );
    return result
};

