import { React, useState, useEffect } from 'react';
import axios from 'axios';

export default function User() {

    const [data, setData] = useState(
        []
    );

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                '/api/users'
            );
            setData(result.data)
        };
        fetchData();

    }, [])

    data.map(item => {
        console.log(item.name)
    })
    return (
        <div>

            {data.map(item => (
                <p>{item.name}</p>
            ))}

        </div>
    )
}