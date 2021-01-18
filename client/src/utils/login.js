import { React, useEffect } from 'react'
import axios from 'axios';

export const login = async () => {
    const result = await axios(
        'http://localhost:3001/api/login'
    );
    console.log(result)
};

