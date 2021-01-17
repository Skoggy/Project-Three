import axios from 'axios';

export default async function getStock() {
    const stockGroupURL = 'http://localhost:3001/api/stocktype'
    const result = await axios.get(stockGroupURL)

}




