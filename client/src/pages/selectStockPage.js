import { React, useState, useEffect } from 'react';
import axios from 'axios'
// import { StockGroupList } from '../components/StockGroupList'
import { createStockType } from '../utils/createStockType'

export const SelectStockPage = () => {
    const [stockTypes, setStockTypes] = useState([])
    const [clickedStockTypes, setClickedStockTypes] = useState("")
    const [stockName, setStockName] = useState({
        name: ''
    })

    const createStockGroupURL = 'http://localhost:3001/api/stocktype'

    const insertStockGroup = (e) => {
        e.preventDefault();
        const data = { name: stockName.name }
        axios.post(createStockGroupURL, data).then((result) => {
            console.log(result)
        })
    }

    const onChange = (e) => {
        e.persist();

        setStockName({ ...stockName, [e.target.name]: e.target.value })
    }


    return (
        <div>
            <button onClick={setStockTypes}>Check</button>
            <form onSubmit={insertStockGroup}>
                <label>Name</label>
                <input type="text" name="name" id="Name" placeholder="Name" value={stockName.name} onChange={onChange} />
                <button>Submit</button>
            </form>
        </div >
    )
}
