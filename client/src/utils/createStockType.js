import axios from 'axios';

export const createStockType = async () => {
    const result = await axios.post(
        'http://localhost:3001/api/stocktype',
        { name: "Sheetmetal" }
    );
    console.log(result)
}