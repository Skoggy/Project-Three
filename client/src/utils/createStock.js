import axios from 'axios';

export const createStock = async () => {
    const result = await axios.post(
        'http://localhost:3001/api/stock',
        { name: "2 MM Mild Steel" }
    );
    console.log(result)
}