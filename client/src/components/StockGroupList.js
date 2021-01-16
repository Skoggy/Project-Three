import { React, useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import getStock from '../utils/getStock'
import axios from "axios"
import { StockContext } from '../utils/StockContext';

const buttonStyles = styled.button`

`

export const StockGroupList = () => {

    const [allStockGroups, setAllStockGroups] = useState([])
    const [stockName, setStockName] = useState({
        name: ''
    })
    const stockGroupURL = 'http://localhost:3001/api/stocktype'


    useEffect(() => {
        axios(stockGroupURL).then(res => {
            setAllStockGroups(res)
            console.log(res)
        })
    }, [])


    const insertStockGroup = (e) => {
        e.preventDefault();
        const data = { name: stockName.name }
        axios.post(stockGroupURL, data).then((result) => {
            console.log(result.data)
        })
    }
    const onChange = (e) => {
        e.persist();
        setStockName({ ...stockName, [e.target.name]: e.target.value })

    }

    return (
        <div>
            {allStockGroups.data.map(res => <button key={res.id}>{res.name}</button>)}
            <form onSubmit={insertStockGroup}>
                <label>Name</label>
                <input type="text" name="name" id="Name" placeholder="Name" value={stockName.name} onChange={onChange} />
                <button>Submit</button>
            </form>
        </div >
    )
}
